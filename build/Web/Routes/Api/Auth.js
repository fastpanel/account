"use strict";
/**
 * Auth.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const Middleware = __importStar(require("../../Middleware"));
const http_1 = require("@fastpanel/http");
const Models_1 = require("../../../Models");
/**
 * Class Auth
 *
 *
 *
 * @version 1.0.0
 */
class Auth extends http_1.RoutDefines {
    /**
     * Initialize command.
     */
    initialize() {
        super.initialize();
        this.router.get(
        /* Path. */
        '/', 
        /* Check authorization. */
        Middleware.Auth.handler(), 
        /* Rout handler. */
        async (request, response) => { return await this.logInStatus(request, response); });
        this.router.post(
        /* Path. */
        '/', 
        /* Rout handler. */
        async (request, response, next) => { return await this.logInAction(request, response, next); });
        this.router.delete(
        /* Path. */
        '/', 
        /* Check authorization. */
        Middleware.Auth.handler(), 
        /* Rout handler. */
        async (request, response) => { return await this.logOutAction(request, response); });
        this.web.use('/api/auth', this.router);
    }
    /**
     *
     * @param request
     * @param response
     */
    async logInStatus(request, response) {
        if (request.isAuthenticated()) {
            /* Send success data. */
            return response
                .status(200)
                .json({
                status: 'success',
                code: 200,
                message: 'Ok',
                data: {
                    token: request.headers.authorization.split(' ')[1],
                    user: request.user.toJSON()
                }
            });
        }
        else {
            /* Send failed data. */
            return response
                .status(401)
                .json({
                status: 'failed',
                code: 401,
                message: 'Unauthorized'
            });
        }
    }
    /**
     *
     * @param request
     * @param response
     * @param next
     */
    async logInAction(request, response, next) {
        passport_1.default.authenticate('local', { session: false }, (error, user, info) => {
            if (error) {
                return next(error);
            }
            if (!user) {
                /* Send failed data. */
                return response
                    .status(422)
                    .json({
                    status: 'failed',
                    code: 422,
                    message: info.message
                });
            }
            if (!user.enabled) {
                /* Send failed data. */
                return response
                    .status(403)
                    .json({
                    status: 'failed',
                    code: 403,
                    message: 'Forbidden.'
                });
            }
            /* ------------------------------------------------------------------- */
            const TokenModel = mongoose_1.default.model('Account.Token');
            let expiresAt = (new Date((new Date().getTime() + this.config.get('Extensions/Http.session.expires', (1000 * 60 * 60 * 24 * 15)))));
            let token = new TokenModel({
                name: 'session',
                type: Models_1.TokenType.USER,
                user: user,
                expiresAt: expiresAt,
                enabled: true
            });
            token.save((error, token) => {
                if (error)
                    return next(error);
                /* Fire event. */
                this.events.emit('account:login', user);
                /* Send success data. */
                return response
                    .status(201)
                    .json({
                    status: 'success',
                    code: 201,
                    message: 'Created',
                    data: {
                        token: token.id,
                        user: user.toJSON()
                    }
                });
            });
        })(request, response, next);
    }
    /**
     *
     * @param request
     * @param response
     */
    async logOutAction(request, response) {
        const TokenModel = mongoose_1.default.model('Account.Token');
        try {
            let token = await TokenModel
                .findOne({
                _id: request.headers.authorization.split(' ')[1],
                type: {
                    $nin: [
                        Models_1.TokenType.APPLICATION,
                        Models_1.TokenType.DEVICE
                    ]
                }
            })
                .populate({
                path: 'user',
                populate: {
                    path: 'group'
                }
            })
                .exec();
            if (token) {
                /* Fire event. */
                this.events.emit('account:logout', token.user);
                /* Delete token. */
                await token.remove();
                /* Send success data. */
                return response
                    .status(200)
                    .json({
                    status: 'success',
                    code: 200,
                    message: 'Ok'
                });
            }
            else {
                /* Send failed data. */
                return response
                    .status(400)
                    .json({
                    status: 'failed',
                    code: 400,
                    message: 'Bad Request'
                });
            }
        }
        catch (error) {
            /* Send failed data. */
            return response
                .status(500)
                .json({
                status: 'failed',
                code: 500,
                message: error.toString()
            });
        }
    }
}
exports.Auth = Auth;
/* End of file Auth.ts */ 

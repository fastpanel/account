"use strict";
/**
 * LogIn.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const Models_1 = require("../../Models");
/**
 *
 * @param superClass
 */
exports.LogIn = (superClass) => class extends superClass {
    /**
     * LogIn mixin constructor.
     *
     * @param di Di container instant.
     */
    constructor(di) {
        super(di);
    }
    /**
     * Initialize command.
     */
    initialize() {
        super.initialize();
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
};
/* End of file LogIn.ts */ 

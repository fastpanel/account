"use strict";
/**
 * LogOut.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Models_1 = require("../../Models");
/**
 *
 * @param superClass
 */
exports.LogOut = (superClass) => class extends superClass {
    /**
     * LogOut mixin constructor.
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
};
/* End of file LogOut.ts */ 

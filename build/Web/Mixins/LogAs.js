"use strict";
/**
 * LogAs.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @param superClass
 */
exports.LogAs = (superClass) => class extends superClass {
    /**
     * LogAs mixin constructor.
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
    async LogAsAction(request, response) {
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
};
/* End of file LogAs.ts */ 

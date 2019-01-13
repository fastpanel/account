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
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
class Auth {
    static handler() {
        return async function (request, response, next) {
            passport_1.default.authenticate('bearer', { session: false }, function (error, user, info) {
                /* Forward error. */
                if (error) {
                    return next(error);
                }
                /* Check user. */
                if (!user) {
                    /* Send failed data. */
                    return response.format({
                        'application/json': function () {
                            return response
                                .status(401)
                                .json({
                                status: 'failed',
                                code: 401,
                                message: 'Unauthorized'
                            });
                        },
                        'text/html': function () {
                            return response.redirect('/');
                        },
                        'default': function () {
                            return response.status(406).send('Not Acceptable');
                        }
                    });
                }
                /* Set user data. */
                request.logIn(user, { session: false }, function (error) {
                    /* Forward error. */
                    if (error) {
                        return next(error);
                    }
                    /*  */
                    return next();
                });
            })(request, response, next);
        };
    }
}
exports.Auth = Auth;
/* End of file Auth.ts */ 

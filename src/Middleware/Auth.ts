/**
 * Auth.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */

import Passport from 'passport';
import { Request, Response, NextFunction } from 'express';

export class Auth {

  static handler () {
    return async function (request: Request, response: Response, next: NextFunction) {
      Passport.authenticate('bearer', { session: false }, function (error, user, info) {
        /* Forward error. */
        if (error) { return next(error); }
        
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
        request.logIn(user, {session: false}, function (error) {
          /* Forward error. */
          if (error) { return next(error); }

          /*  */
          return next();
        });
      })(request, response, next);
    }
  }

}

/* End of file Auth.ts */
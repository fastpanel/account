/**
 * Auth.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */

import Passport from 'passport';
import Mongoose from 'mongoose';
import * as Middleware from '../../Middleware';
import { RoutDefines } from '@fastpanel/http';
import { Request, Response, NextFunction } from 'express';
import { IToken, TokenType } from '../../Models';

/**
 * Class Auth
 * 
 * 
 * 
 * @version 1.0.0
 */
export class Auth extends RoutDefines {

  /**
   * Initialize command.
   */
  async initialize () : Promise<any> {
    await super.initialize();
    
    this.router.get(
      /* Path. */
      '/',
      /* Check authorization. */
      Middleware.Auth.handler(),
      /* Rout handler. */
      async (request, response) => { return await this.logInStatus(request, response); }
    );

    this.router.post(
      /* Path. */
      '/',
      /* Rout handler. */
      async (request, response, next) => { return await this.logInAction(request, response, next); }
    );

    this.router.delete(
      /* Path. */
      '/',
      /* Check authorization. */
      Middleware.Auth.handler(),
      /* Rout handler. */
      async (request, response) => { return await this.logOutAction(request, response); }
    );
    
    this.web.use('/api/auth', this.router);
  }

  /**
   * 
   * @param request 
   * @param response 
   */
  async logInStatus (request: Request, response: Response) : Promise<any> {
    if (request.isAuthenticated()) {
      /* Get token. */
      let token = request.headers.authorization.split(' ')[1];

      /* Send data. */
      return response
      .status(200)
      .json({
        status: 'success',
        code: 200,
        message: 'Ok',
        data: {
          token: token,
          user: request.user.toJSON()
        }
      });
    } else {
      /* Send data. */
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
  async logInAction (request: Request, response: Response, next: NextFunction) : Promise<any> {
    Passport.authenticate('local', { session: false }, (error, user, info) => {
      /* Forward error. */
      if (error) { return next(error); }

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

      const TokenModel = Mongoose.model<IToken>('Account.Token');

      let expiresAt = (new Date((new Date().getTime() + this.config.get('Services/Web.session.token.expires', (1000 * 60 * 60 * 24 * 15)))));

      let token = new TokenModel({
        name: 'session',
        type: TokenType.USER,
        user: user,
        expiresAt: expiresAt,
        enabled: true
      });
      token.save((error, token) => {
        /* Forward error. */
        if (error) return next(error);

        /* Send data. */
        return response
        .status(201)
        .json({
          status: 'success',
          code: 201,
          message: 'Created',
          data: {
            user: user.toJSON(),
            token: token.id
          }
        });
      });
    }) (request, response, next);
  }

  /**
   * 
   * @param request 
   * @param response 
   */
  async logOutAction (request: Request, response: Response) : Promise<any> {
    const TokenModel = Mongoose.model<IToken>('Account.Token');

    let token = request.headers.authorization.split(' ')[1];
    
    try {
      await TokenModel.findOneAndRemove({
        _id: token,
        type: {
          $ne: 'app'
        }
      }).exec();

      /* Send success data. */
      return response
      .status(200)
      .json({
        status: 'success',
        code: 200,
        message: 'Ok'
      });
    } catch (error) {
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

/* End of file Auth.ts */
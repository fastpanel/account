/**
 * LogIn.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import Passport from 'passport';
import Mongoose from 'mongoose';
import { Di } from '@fastpanel/core';
import { IToken, TokenType } from '../../Models';
import { Request, Response, NextFunction } from 'express';

/**
 * 
 * @param superClass 
 */
export const LogIn = (superClass: any) => class extends superClass {
  
  /**
   * LogIn mixin constructor.
   * 
   * @param di Di container instant.
   */
  constructor (di?: Di.Container) {
    super(di);
  }

  /**
   * Initialize command.
   */
  initialize () {
    super.initialize();
  }
  
  /**
   * 
   * @param request 
   * @param response 
   * @param next 
   */
  async logInAction (request: Request, response: Response, next: NextFunction) : Promise<any> {
    Passport.authenticate('local', { session: false }, (error, user, info) => {
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

      let expiresAt = (new Date((new Date().getTime() + this.config.get('Extensions/Http.session.expires', (1000 * 60 * 60 * 24 * 15)))));

      let token: IToken = new TokenModel({
        name: 'session',
        type: TokenType.USER,
        user: user,
        expiresAt: expiresAt,
        enabled: true
      });

      token.save((error, token) => {
        if (error) return next(error);
        
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
    }) (request, response, next);
  }

}

/* End of file LogIn.ts */
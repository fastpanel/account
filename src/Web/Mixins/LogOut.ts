/**
 * LogOut.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import Mongoose from 'mongoose';
import { Di } from '@fastpanel/core';
import { IToken, TokenType } from '../../Models';
import { Request, Response, NextFunction } from 'express';

/**
 * 
 * @param superClass 
 */
export const LogOut = (superClass: any) => class extends superClass {
  
  /**
   * LogOut mixin constructor.
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
   */
  async logOutAction (request: Request, response: Response) : Promise<any> {
    const TokenModel = Mongoose.model<IToken>('Account.Token');

    try {
      let token: IToken = await TokenModel
      .findOne({
        _id: request.headers.authorization.split(' ')[1],
        type: {
          $nin: [
            TokenType.APPLICATION,
            TokenType.DEVICE
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
      } else {
        /* Send failed data. */
        return response
        .status(400)
        .json({
          status: 'failed',
          code: 400,
          message: 'Bad Request'
        });
      }
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

/* End of file LogOut.ts */
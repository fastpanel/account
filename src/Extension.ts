/**
 * Extension.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import Caporal from 'caporal';
import Express from 'express';
import Passport from 'passport';
import Mongoose from 'mongoose';
import { Cli, Extensions } from '@fastpanel/core';
import { Strategy as PassportLocalStrategy } from 'passport-local';
import { Strategy as PassportBearerStrategy } from 'passport-http-bearer';
import { IUser, IToken } from './Models';

/**
 * Class Extension
 * 
 * Initialization of the extension.
 * 
 * @version 1.0.0
 */
export class Extension extends Extensions.ExtensionDefines {

  /**
   * Registers a service provider.
   */
  async register () : Promise<any> {
    /* Registration local strategy. */
    Passport.use(new PassportLocalStrategy(async (username, password, done) => {
      /* Get model. */
      const User = Mongoose.model<IUser>('Account.User');

      try {
        /* Find user by credentials. */
        let user = await User
        .findOne({
          nickname: username
        })
        .populate({
          path: 'group'
        })
        .exec();
        
        /* Check user. */
        if (!user) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }

        /* Check password. */
        if (!user.verifyPasswordSync(password)) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }));
    
    /* Registration bearer strategy. */
    Passport.use(new PassportBearerStrategy(async (token, done) => {
      /* Check token. */
      if (!Mongoose.Types.ObjectId.isValid(token)) {
        return done(null, false, 'Incorrect token.');
      }

      /* Get model. */
      const TokenModel = Mongoose.model<IToken>('Account.Token');

      try {
        /* Find user bu token. */
        let record: IToken = await TokenModel
        .findOne({
          _id: token,
          enabled: true,
          $or: [
            {
              expiresAt: {
                $gt: (new Date())
              }
            },
            {
              expiresAt: {
                $type: 10
              }
            }
          ]
        })
        .populate({
          path: 'user',
          populate: {
            path: 'group'
          }
        })
        .exec();
        
        /* Check token record. */
        if (!record) {
          done(null, false, 'Incorrect token.');
        } else if (!record.user) {
          done(null, false, 'Incorrect token.');
        }
        
        /* Auth success. */
        done(null, record.user);
      } catch (error) {
        done(error, false);
      }
    }));

    /* Registration serialization. */
    Passport.serializeUser(async (user: IUser, done) => {
      done(null, user.id);
    });

    /* Registration deserialization. */
    Passport.deserializeUser(async (id, done) => {
      /* Get model. */
      const User = Mongoose.model<IUser>('Account.User');

      try {
        let user = await User
        .findById(id)
        .populate('group')
        .exec();

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    });

    this.events.once('cli:getCommands', (cli: Caporal) => {
      const { Seeds } = require('./Commands/Seeds');
      (new Seeds(this.di)).initialize();

      const { Setup } = require('./Commands/Setup');
      (new Setup(this.di)).initialize();
    });

    this.events.once('db:getModels', (db: Mongoose.Connection) => {});

    this.events.once('web:getMiddleware', (web: Express.Application) => {
      web.use(Passport.initialize());
      web.use(Passport.session());
    });

    this.events.once('web:getRoutes', (web: Express.Application) => {});
  }
  
  /**
   * Startup a service provider.
   */
  async startup () : Promise<any> {}

}

/* End of file Extension.ts */
/**
 * Extension.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */

import Vorpal from 'vorpal';
import Express from 'express';
import Passport from 'passport';
import Mongoose from 'mongoose';
import { Cli, Extensions } from '@fastpanel/core';
import { Strategy as PassportLocalStrategy } from 'passport-local';
import { Strategy as PassportBearerStrategy } from 'passport-http-bearer';
import { IUser, IToken, IGroup, TokenType, LabelTarget, ILabel } from './Models';

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

    /* --------------------------------------------------------------------- */
    
    this.events.once('cli:getCommands', async (cli: Vorpal) => {});

    this.events.on('app:getSetupSubscriptions', (list: Array<Cli.CommandSubscriptionDefines>) => {
      list.push(async (command: Vorpal.CommandInstance, args?: any) => {});
    });
    
    /* --------------------------------------------------------------------- */

    this.events.once('db:getModels', async (db: Mongoose.Connection) => {
      require('./Models/');
    });

    this.events.on('db:getSeedsSubscriptions', (list: Array<Cli.CommandSubscriptionDefines>) => {
      list.push(async (command: Vorpal.CommandInstance, args?: any) => {
        const GroupModel = Mongoose.model<IGroup>('Account.Group');
        const UserModel = Mongoose.model<IUser>('Account.User');
        const TokenModel = Mongoose.model<IToken>('Account.Token');
        const LabelModel = Mongoose.model<ILabel>('Account.Label');
        
        /* --------------------------------------------------------------- */
        
        await TokenModel.deleteMany({});
        await UserModel.deleteMany({});
        await GroupModel.deleteMany({});
        await LabelModel.deleteMany({});
        
        /* --------------------------------------------------------------- */

        let adminGroup = await GroupModel.findOneAndUpdate({ alias: 'admin' }, {
          $set: {
            alias: 'admin',
            label: 'Administrators'
          }
        }, { new: true, upsert: true, setDefaultsOnInsert: true })
        .exec();

        let managerGroup = await GroupModel.findOneAndUpdate({ alias: 'manager' }, {
          $set: {
            alias: 'manager',
            label: 'Managers'
          }
        }, { new: true, upsert: true, setDefaultsOnInsert: true })
        .exec();

        let terminalGroup = await GroupModel.findOneAndUpdate({ alias: 'terminal' }, {
          $set: {
            alias: 'terminal',
            label: 'Terminals'
          }
        }, { new: true, upsert: true, setDefaultsOnInsert: true })
        .exec();

        let clientGroup = await GroupModel.findOneAndUpdate({ alias: 'client' }, {
          $set: {
            alias: 'client',
            label: 'Clients'
          }
        }, { new: true, upsert: true, setDefaultsOnInsert: true })
        .exec();

        /* --------------------------------------------------------------- */

        let adminUser = await UserModel.findOneAndUpdate({ nickname: 'admin' }, {
          $set: {
            group: adminGroup.id,
            name: {
              displayName: 'Administrator'
            },
            nickname: 'admin',
            password: 'Qwerty123456'
          }
        }, { new: true, upsert: true, setDefaultsOnInsert: true })
        .exec();
        
        /* --------------------------------------------------------------- */
        
        let tokens = [
          {
            _id: '5b6ac09242f5024d308a6bd9',
            name: 'Postman develop',
            type: TokenType.APPLICATION,
            user: adminUser.id
          }
        ];

        for (const token of tokens) {
          await TokenModel
          .findOneAndUpdate({ _id: token._id }, { 
            $set: token
          }, { new: true, upsert: true, setDefaultsOnInsert: true })
          .exec();
        }

        /* --------------------------------------------------------------- */
        
        let labels = [
          {
            alias: 'HOME',
            title: '',
            target: [
              LabelTarget.PHONE,
              LabelTarget.EMAIL,
              LabelTarget.POSTAL,
              LabelTarget.URL
            ]
          },
          {
            alias: 'WORK',
            title: '',
            target: [
              LabelTarget.PHONE,
              LabelTarget.EMAIL,
              LabelTarget.POSTAL,
              LabelTarget.URL
            ]
          },
          {
            alias: 'OTHER',
            title: '',
            target: [
              LabelTarget.PHONE,
              LabelTarget.EMAIL,
              LabelTarget.POSTAL,
              LabelTarget.URL
            ]
          }
        ];

        for (const label of labels) {
          await LabelModel
          .findOneAndUpdate({ alias: label.alias }, { 
            $set: label
          }, { new: true, upsert: true, setDefaultsOnInsert: true })
          .exec();
        }
      });
    });

    /* --------------------------------------------------------------------- */

    this.events.once('web:getMiddleware', async (web: Express.Application) => {
      web.use(Passport.initialize());
      web.use(Passport.session());
    });

    this.events.once('web:getRoutes', async (web: Express.Application) => {
      const { Auth } = require('./Routes/Api/Auth');
      await (new Auth(this.di)).initialize();
    });

    /* --------------------------------------------------------------------- */

    this.events.once('socket:getMiddleware', async (socket: SocketIO.Server) => {});

    this.events.once('socket:getActions', async (socket: SocketIO.Server) => {});
  }
  
  /**
   * Startup a service provider.
   */
  async startup () : Promise<any> {}

}

/* End of file Extension.ts */
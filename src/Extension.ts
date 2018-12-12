/**
 * Extension.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */

import Vorpal from 'vorpal';
import Express from 'express';
import Mongoose from 'mongoose';
import Passport from 'passport';
import { Strategy as PassportLocalStrategy } from 'passport-local';
import { Strategy as PassportBearerStrategy } from 'passport-http-bearer';
import { IUser, IToken, IGroup, TokenType } from './Models';
import { Extensions } from '@fastpanel/core';
import { SetupTaskDefinesMethod } from '@fastpanel/core/build/Commands';

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
    Passport.use(new PassportLocalStrategy((username, password, done) => {
      /* Get model. */
      const User = Mongoose.model<IUser>('Account.User');

      /* Find user by credentials. */
      User
      .findOne({
        nickname: username
      })
      .exec((error, user) => {
        /* Check db errors. */
        if (error) { return done(error); }

        /* Check user. */
        if (!user) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }

        /* Check password. */
        if (!user.verifyPasswordSync(password)) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        
        /* Auth success. */
        return done(null, user);
      });
    }));
    
    /* Registration bearer strategy. */
    Passport.use(new PassportBearerStrategy(function(token, done) {
      /* Check token. */
      if (!Mongoose.Types.ObjectId.isValid(token)) {
        return done(null, false, 'Incorrect token.');
      }

      /* Get model. */
      const TokenModel = Mongoose.model<IToken>('Account.Token');

      /* Find user bu token. */
      TokenModel
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
      .exec(function (error, token) {
        /* Check db errors. */
        if (error) { return done(error); }
        
        /* Check token record. */
        if (!token) { return done(null, false, 'Incorrect token.'); }
        
        /* Auth success. */
        return done(null, token.user);
      });
    }));

    /* Registration serialization. */
    Passport.serializeUser(function(user: IUser, done) {
      done(null, user.id);
    });

    /* Registration deserialization. */
    Passport.deserializeUser(function(id, done) {
      const User = Mongoose.model<IUser>('Account.User');
      User.findById(id, function(err, user: IUser) {
        done(err, user);
      });
    });

    /* --------------------------------------------------------------------- */
    
    this.events.on('app:getSetupTasks', async (list: Array<SetupTaskDefinesMethod>) => {});
    
    this.events.once('cli:getCommands', async (cli: Vorpal) => {});

    /* --------------------------------------------------------------------- */

    this.events.once('db:getModels', async (db: Mongoose.Connection) => {
      require('./Models/');
    });

    this.events.on('db:getSeedsTasks', async (list: Array<Promise<any>>) => {
      list.push(new Promise(async (resolve, reject) => {
        const GroupModel = Mongoose.model<IGroup>('Account.Group');
        const UserModel = Mongoose.model<IUser>('Account.User');
        const TokenModel = Mongoose.model<IToken>('Account.Token');
        
        await TokenModel.deleteMany({});
        await UserModel.deleteMany({});
        await GroupModel.deleteMany({});

        try {
          
          let adminGroup = new GroupModel({
            alias: 'admin',
            label: 'Administrators'
          });
          await adminGroup.save();

          let managerGroup = new GroupModel({
            alias: 'manager',
            label: 'Managers'
          });
          await managerGroup.save();

          let terminalGroup = new GroupModel({
            alias: 'terminal',
            label: 'Terminals'
          });
          await terminalGroup.save();

          let clientGroup = new GroupModel({
            alias: 'client',
            label: 'Clients'
          });
          await clientGroup.save();

          /* --------------------------------------------------------------- */

          let adminUser = new UserModel({
            group: adminGroup,
            name: {
              displayName: 'Administrator'
            },
            nickname: 'admin',
            password: 'Qwerty123456'
          });
          await adminUser.save();

          let managerUser = new UserModel({
            group: managerGroup,
            name: {
              displayName: 'Manager'
            },
            nickname: 'manager',
            password: 'Qwerty123456'
          });
          await managerUser.save();

          let terminalUser = new UserModel({
            group: terminalGroup,
            name: {
              displayName: 'Terminal'
            },
            nickname: 'terminal',
            password: 'Qwerty123456'
          });
          await terminalUser.save();

          let clientUser = new UserModel({
            group: clientGroup,
            name: {
              displayName: 'Client'
            },
            nickname: 'client',
            password: 'Qwerty123456'
          });
          await clientUser.save();

          /* --------------------------------------------------------------- */
          
          let postmenToken = new TokenModel({
            _id: '5b6ac09242f5024d308a6bd9',
            name: 'Postman develop',
            type: TokenType.APPLICATION,
            user: adminUser
          });
          await postmenToken.save();

        } catch (error) {
          reject(error);
        }

        resolve();
      }));
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
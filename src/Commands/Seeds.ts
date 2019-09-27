/**
 * Seeds.js
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import Mongoose from 'mongoose';
import Winston from 'winston';
import { Cli } from '@fastpanel/core';
import {
  TokenType,
  IToken,
  IUser,
  IGroup
} from '../Models';

/**
 * Class Seeds
 * 
 * @version 1.0.0
 */
export class Seeds extends Cli.CommandDefines {
  
  /**
   * Initialize a commands provider.
   */
  public initialize () {
    this.cli
    .command('fastpanel/account seeds', 'Seeding account database data.')
    .option('-f, --fresh', 'Clear the base before filling.')
    .option('-d, --demo', 'Fill demo data.')
    .visible(false)
    .action((args: {[k: string]: any}, options: {[k: string]: any}, logger: Winston.Logger) => {
      return new Promise(async (resolve, reject) => {
        /* Get models. */
        const GroupModel = Mongoose.model<IGroup>('Account.Group');
        const TokenModel = Mongoose.model<IToken>('Account.Token');
        const UserModel = Mongoose.model<IUser>('Account.User');

        /* Clear collections. ---------------------------------------------- */

        if (options.fresh) {
          await GroupModel.deleteMany({});
          await TokenModel.deleteMany({});
          await UserModel.deleteMany({});
        }
        
        /* Fill default data. ---------------------------------------------- */

        let groupList = await GroupModel
        .find()
        .select('_id')
        .exec();

        if (!groupList.length) {
          await GroupModel
          .findOneAndUpdate({ alias: 'admin' }, {
            $set: {
              alias: 'admin',
              label: 'Administrators'
            }
          }, { new: true, upsert: true, setDefaultsOnInsert: true })
          .exec();

          await GroupModel
          .findOneAndUpdate({ alias: 'manager' }, {
            $set: {
              alias: 'manager',
              label: 'Managers'
            }
          }, { new: true, upsert: true, setDefaultsOnInsert: true })
          .exec();

          await GroupModel
          .findOneAndUpdate({ alias: 'device' }, {
            $set: {
              alias: 'device',
              label: 'Devices'
            }
          }, { new: true, upsert: true, setDefaultsOnInsert: true })
          .exec();

          await GroupModel
          .findOneAndUpdate({ alias: 'client' }, {
            $set: {
              alias: 'client',
              label: 'Clients'
            }
          }, { new: true, upsert: true, setDefaultsOnInsert: true })
          .exec();
        }
        
        /* ----------------------------------------------------------------- */

        let usersList = await UserModel
        .find()
        .select('_id')
        .exec();

        if (!usersList.length) {
          let adminGroup = await GroupModel
          .findOne({ alias: 'admin' })
          .exec();

          if (adminGroup) {
            await UserModel
            .findOneAndUpdate({ nickname: 'admin' }, {
              $set: {
                group: adminGroup.id,
                name: {
                  displayName: 'Administrator'
                },
                nickname: 'admin',
                email: 'admin@system.sys',
                phone: '+15551234567',
                password: 'Qwerty123456'
              }
            }, { new: true, upsert: true, setDefaultsOnInsert: true })
            .exec();
          }
        }
        
        /* ----------------------------------------------------------------- */

        let tokensList = await TokenModel
        .find()
        .select('_id')
        .exec();

        if (!tokensList.length) {
          let adminUser = await UserModel
          .findOne({ nickname: 'admin' })
          .exec();

          if (adminUser) {
            let tokens = [
              {
                name: 'Postman develop',
                type: TokenType.APPLICATION,
                user: adminUser.id
              }
            ];

            for (const token of tokens) {
              await TokenModel
              .findOneAndUpdate({ name: token.name }, { 
                $set: token
              }, { new: true, upsert: true, setDefaultsOnInsert: true })
              .exec();
            }
          }
        }

        /* Fill demo data. ------------------------------------------------- */

        if (options.demo) {}

        /* Command complete. ----------------------------------------------- */
        resolve();
      });
    });
  }

}

/* End of file Seeds.js */
"use strict";
/**
 * Seeds.js
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@fastpanel/core");
const Models_1 = require("../Models");
/**
 * Class Seeds
 *
 * @version 1.0.0
 */
class Seeds extends core_1.Cli.CommandDefines {
    /**
     * Initialize a commands provider.
     */
    initialize() {
        this.cli
            .command('fastpanel/account seeds', 'Seeding account database data.')
            .option('-f, --fresh', 'Clear the base before filling.')
            .option('-d, --demo', 'Fill demo data.')
            .visible(false)
            .action((args, options, logger) => {
            return new Promise(async (resolve, reject) => {
                /* Clear collections. ---------------------------------------------- */
                if (options.fresh) {
                    await Models_1.GroupModel.deleteMany({});
                    await Models_1.TokenModel.deleteMany({});
                    await Models_1.UserModel.deleteMany({});
                }
                /* Fill default data. ---------------------------------------------- */
                let groupList = await Models_1.GroupModel
                    .find()
                    .select('_id')
                    .exec();
                if (!groupList.length) {
                    await Models_1.GroupModel
                        .findOneAndUpdate({ alias: 'admin' }, {
                        $set: {
                            alias: 'admin',
                            label: 'Administrators'
                        }
                    }, { new: true, upsert: true, setDefaultsOnInsert: true })
                        .exec();
                    await Models_1.GroupModel
                        .findOneAndUpdate({ alias: 'manager' }, {
                        $set: {
                            alias: 'manager',
                            label: 'Managers'
                        }
                    }, { new: true, upsert: true, setDefaultsOnInsert: true })
                        .exec();
                    await Models_1.GroupModel
                        .findOneAndUpdate({ alias: 'device' }, {
                        $set: {
                            alias: 'device',
                            label: 'Devices'
                        }
                    }, { new: true, upsert: true, setDefaultsOnInsert: true })
                        .exec();
                    await Models_1.GroupModel
                        .findOneAndUpdate({ alias: 'client' }, {
                        $set: {
                            alias: 'client',
                            label: 'Clients'
                        }
                    }, { new: true, upsert: true, setDefaultsOnInsert: true })
                        .exec();
                }
                /* ----------------------------------------------------------------- */
                let usersList = await Models_1.UserModel
                    .find()
                    .select('_id')
                    .exec();
                if (!usersList.length) {
                    let adminGroup = await Models_1.GroupModel
                        .findOne({ alias: 'admin' })
                        .exec();
                    if (adminGroup) {
                        await Models_1.UserModel
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
                let tokensList = await Models_1.TokenModel
                    .find()
                    .select('_id')
                    .exec();
                if (!tokensList.length) {
                    let adminUser = await Models_1.UserModel
                        .findOne({ nickname: 'admin' })
                        .exec();
                    if (adminUser) {
                        let tokens = [
                            {
                                name: 'Postman develop',
                                type: Models_1.TokenType.APPLICATION,
                                user: adminUser.id
                            }
                        ];
                        for (const token of tokens) {
                            await Models_1.TokenModel
                                .findOneAndUpdate({ name: token.name }, {
                                $set: token
                            }, { new: true, upsert: true, setDefaultsOnInsert: true })
                                .exec();
                        }
                    }
                }
                /* Fill demo data. ------------------------------------------------- */
                if (options.demo) { }
                /* Command complete. ----------------------------------------------- */
                resolve();
            });
        });
    }
}
exports.Seeds = Seeds;
/* End of file Seeds.js */ 

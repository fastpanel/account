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
                    await Models_1.EmailAddressModel.deleteMany({});
                    await Models_1.GroupModel.deleteMany({});
                    await Models_1.LabelModel.deleteMany({});
                    await Models_1.OrganizationModel.deleteMany({});
                    await Models_1.PhoneNumberModel.deleteMany({});
                    await Models_1.PostalAddressModel.deleteMany({});
                    await Models_1.TokenModel.deleteMany({});
                    await Models_1.UrlModel.deleteMany({});
                    await Models_1.UserModel.deleteMany({});
                }
                /* Fill default data. ---------------------------------------------- */
                if (!await Models_1.LabelModel.find().exec()) {
                    let labels = [
                        {
                            alias: 'HOME',
                            title: 'Домашний',
                            target: [
                                Models_1.LabelTarget.PHONE,
                                Models_1.LabelTarget.EMAIL,
                                Models_1.LabelTarget.POSTAL,
                                Models_1.LabelTarget.URL
                            ]
                        },
                        {
                            alias: 'WORK',
                            title: 'Рабочий',
                            target: [
                                Models_1.LabelTarget.PHONE,
                                Models_1.LabelTarget.EMAIL,
                                Models_1.LabelTarget.POSTAL,
                                Models_1.LabelTarget.URL
                            ]
                        },
                        {
                            alias: 'OTHER',
                            title: 'Другой',
                            target: [
                                Models_1.LabelTarget.PHONE,
                                Models_1.LabelTarget.EMAIL,
                                Models_1.LabelTarget.POSTAL,
                                Models_1.LabelTarget.URL
                            ]
                        },
                        {
                            alias: 'FAX_HOME',
                            title: 'Факс домашний',
                            target: [
                                Models_1.LabelTarget.PHONE
                            ]
                        },
                        {
                            alias: 'FAX_WORK',
                            title: 'Факс рабочий',
                            target: [
                                Models_1.LabelTarget.PHONE
                            ]
                        },
                        {
                            alias: 'PAGER',
                            title: 'Пейджер',
                            target: [
                                Models_1.LabelTarget.PHONE
                            ]
                        },
                        {
                            alias: 'MAIN',
                            title: 'Основной',
                            target: [
                                Models_1.LabelTarget.PHONE
                            ]
                        },
                        {
                            alias: 'HOMEPAGE',
                            title: 'Домашняя страница',
                            target: [
                                Models_1.LabelTarget.URL
                            ]
                        }
                    ];
                    for (const label of labels) {
                        await Models_1.LabelModel
                            .findOneAndUpdate({ alias: label.alias }, {
                            $set: label
                        }, { new: true, upsert: true, setDefaultsOnInsert: true })
                            .exec();
                    }
                }
                /* ----------------------------------------------------------------- */
                if (!await Models_1.GroupModel.find().exec()) {
                    let adminGroup = await Models_1.GroupModel.findOneAndUpdate({ alias: 'admin' }, {
                        $set: {
                            alias: 'admin',
                            label: 'Administrators'
                        }
                    }, { new: true, upsert: true, setDefaultsOnInsert: true })
                        .exec();
                    let managerGroup = await Models_1.GroupModel.findOneAndUpdate({ alias: 'manager' }, {
                        $set: {
                            alias: 'manager',
                            label: 'Managers'
                        }
                    }, { new: true, upsert: true, setDefaultsOnInsert: true })
                        .exec();
                    let deviceGroup = await Models_1.GroupModel.findOneAndUpdate({ alias: 'device' }, {
                        $set: {
                            alias: 'device',
                            label: 'Devices'
                        }
                    }, { new: true, upsert: true, setDefaultsOnInsert: true })
                        .exec();
                    let clientGroup = await Models_1.GroupModel.findOneAndUpdate({ alias: 'client' }, {
                        $set: {
                            alias: 'client',
                            label: 'Clients'
                        }
                    }, { new: true, upsert: true, setDefaultsOnInsert: true })
                        .exec();
                    /* --------------------------------------------------------------- */
                    if (!await Models_1.UserModel.find().exec()) {
                        let adminUser = await Models_1.UserModel.findOneAndUpdate({ nickname: 'admin' }, {
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
                        /* ------------------------------------------------------------- */
                        if (!await Models_1.TokenModel.find().exec()) {
                            let tokens = [
                                {
                                    _id: '5b6ac09242f5024d308a6bd9',
                                    name: 'Postman develop',
                                    type: Models_1.TokenType.APPLICATION,
                                    user: adminUser.id
                                }
                            ];
                            for (const token of tokens) {
                                await Models_1.TokenModel
                                    .findOneAndUpdate({ _id: token._id }, {
                                    $set: token
                                }, { new: true, upsert: true, setDefaultsOnInsert: true })
                                    .exec();
                            }
                        }
                    }
                }
                /* Fill demo data. ------------------------------------------------- */
                if (options.demo) { }
                /* Command complete. */
                resolve();
            });
        });
    }
}
exports.Seeds = Seeds;
/* End of file Seeds.js */ 

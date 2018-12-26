"use strict";
/**
 * Extension.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_http_bearer_1 = require("passport-http-bearer");
const Models_1 = require("./Models");
const core_1 = require("@fastpanel/core");
/**
 * Class Extension
 *
 * Initialization of the extension.
 *
 * @version 1.0.0
 */
class Extension extends core_1.Extensions.ExtensionDefines {
    /**
     * Registers a service provider.
     */
    async register() {
        /* Registration local strategy. */
        passport_1.default.use(new passport_local_1.Strategy(async (username, password, done) => {
            /* Get model. */
            const User = mongoose_1.default.model('Account.User');
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
            }
            catch (error) {
                done(error, false);
            }
        }));
        /* Registration bearer strategy. */
        passport_1.default.use(new passport_http_bearer_1.Strategy(async (token, done) => {
            /* Check token. */
            if (!mongoose_1.default.Types.ObjectId.isValid(token)) {
                return done(null, false, 'Incorrect token.');
            }
            /* Get model. */
            const TokenModel = mongoose_1.default.model('Account.Token');
            try {
                /* Find user bu token. */
                let record = await TokenModel
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
                }
                /* Auth success. */
                done(null, record.user);
            }
            catch (error) {
                done(error, false);
            }
        }));
        /* Registration serialization. */
        passport_1.default.serializeUser(async (user, done) => {
            done(null, user.id);
        });
        /* Registration deserialization. */
        passport_1.default.deserializeUser(async (id, done) => {
            /* Get model. */
            const User = mongoose_1.default.model('Account.User');
            try {
                let user = await User
                    .findById(id)
                    .populate('group')
                    .exec();
                done(null, user);
            }
            catch (error) {
                done(error, false);
            }
        });
        /* --------------------------------------------------------------------- */
        this.events.on('app:getSetupTasks', async (list) => {
            list.push(async (command, args) => { });
        });
        this.events.once('cli:getCommands', async (cli) => { });
        /* --------------------------------------------------------------------- */
        this.events.once('db:getModels', async (db) => {
            require('./Models/');
        });
        this.events.on('db:getSeedsTasks', async (list) => {
            list.push(async (command, args) => {
                const GroupModel = mongoose_1.default.model('Account.Group');
                const UserModel = mongoose_1.default.model('Account.User');
                const TokenModel = mongoose_1.default.model('Account.Token');
                const LabelModel = mongoose_1.default.model('Account.Label');
                /* --------------------------------------------------------------- */
                await TokenModel.deleteMany({});
                await UserModel.deleteMany({});
                await GroupModel.deleteMany({});
                await LabelModel.deleteMany({});
                /* --------------------------------------------------------------- */
                let adminGroup = await GroupModel.findOneAndUpdate({ alias: 'admin' }, {
                    alias: 'admin',
                    label: 'Administrators'
                }, { upsert: true })
                    .exec();
                let managerGroup = await GroupModel.findOneAndUpdate({ alias: 'manager' }, {
                    alias: 'manager',
                    label: 'Managers'
                }, { upsert: true })
                    .exec();
                let terminalGroup = await GroupModel.findOneAndUpdate({ alias: 'terminal' }, {
                    alias: 'terminal',
                    label: 'Terminals'
                }, { upsert: true })
                    .exec();
                let clientGroup = await GroupModel.findOneAndUpdate({ alias: 'client' }, {
                    alias: 'client',
                    label: 'Clients'
                }, { upsert: true })
                    .exec();
                /* --------------------------------------------------------------- */
                let adminUser = await UserModel.findOneAndUpdate({ nickname: 'admin' }, {
                    group: adminGroup,
                    name: {
                        displayName: 'Administrator'
                    },
                    nickname: 'admin',
                    password: 'Qwerty123456'
                }, { upsert: true })
                    .exec();
                /* --------------------------------------------------------------- */
                let tokens = [
                    {
                        _id: '5b6ac09242f5024d308a6bd9',
                        name: 'Postman develop',
                        type: Models_1.TokenType.APPLICATION,
                        user: adminUser
                    }
                ];
                for (const token of tokens) {
                    await TokenModel
                        .findOneAndUpdate({ _id: token._id }, token, { upsert: true })
                        .exec();
                }
                /* --------------------------------------------------------------- */
                let labels = [
                    {
                        alias: 'HOME',
                        title: '',
                        target: [
                            Models_1.LabelTarget.PHONE,
                            Models_1.LabelTarget.EMAIL,
                            Models_1.LabelTarget.POSTAL,
                            Models_1.LabelTarget.URL
                        ]
                    },
                    {
                        alias: 'WORK',
                        title: '',
                        target: [
                            Models_1.LabelTarget.PHONE,
                            Models_1.LabelTarget.EMAIL,
                            Models_1.LabelTarget.POSTAL,
                            Models_1.LabelTarget.URL
                        ]
                    },
                    {
                        alias: 'OTHER',
                        title: '',
                        target: [
                            Models_1.LabelTarget.PHONE,
                            Models_1.LabelTarget.EMAIL,
                            Models_1.LabelTarget.POSTAL,
                            Models_1.LabelTarget.URL
                        ]
                    }
                ];
                for (const label of labels) {
                    await LabelModel
                        .findOneAndUpdate({ alias: label.alias }, label, { upsert: true })
                        .exec();
                }
            });
        });
        /* --------------------------------------------------------------------- */
        this.events.once('web:getMiddleware', async (web) => {
            web.use(passport_1.default.initialize());
            web.use(passport_1.default.session());
        });
        this.events.once('web:getRoutes', async (web) => {
            const { Auth } = require('./Routes/Api/Auth');
            await (new Auth(this.di)).initialize();
        });
        /* --------------------------------------------------------------------- */
        this.events.once('socket:getMiddleware', async (socket) => { });
        this.events.once('socket:getActions', async (socket) => { });
    }
    /**
     * Startup a service provider.
     */
    async startup() { }
}
exports.Extension = Extension;
/* End of file Extension.ts */ 

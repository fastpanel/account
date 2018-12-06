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
        passport_1.default.use(new passport_local_1.Strategy((username, password, done) => {
            /* Get model. */
            const User = mongoose_1.default.model('Account.User');
            /* Find user by credentials. */
            User
                .findOne({
                nickname: username
            })
                .exec((error, user) => {
                /* Check db errors. */
                if (error) {
                    return done(error);
                }
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
        passport_1.default.use(new passport_http_bearer_1.Strategy(function (token, done) {
            /* Check token. */
            if (!mongoose_1.default.Types.ObjectId.isValid(token)) {
                return done(null, false, 'Incorrect token.');
            }
            /* Get model. */
            const TokenModel = mongoose_1.default.model('Account.Token');
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
                if (error) {
                    return done(error);
                }
                /* Check token record. */
                if (!token) {
                    return done(null, false, 'Incorrect token.');
                }
                /* Auth success. */
                return done(null, token.user);
            });
        }));
        /* Registration serialization. */
        passport_1.default.serializeUser(function (user, done) {
            done(null, user.id);
        });
        /* Registration deserialization. */
        passport_1.default.deserializeUser(function (id, done) {
            const User = mongoose_1.default.model('Account.User');
            User.findById(id, function (err, user) {
                done(err, user);
            });
        });
        /* --------------------------------------------------------------------- */
        this.events.on('app:getSetupTasks', async (list) => { });
        this.events.once('cli:getCommands', async (cli) => { });
        /* --------------------------------------------------------------------- */
        this.events.once('db:getModels', async (db) => {
            require('./Models/');
        });
        this.events.on('db:getSeedsTasks', async (list) => {
            list.push(new Promise(async (resolve, reject) => {
                const GroupModel = mongoose_1.default.model('Account.Group');
                const UserModel = mongoose_1.default.model('Account.User');
                const TokenModel = mongoose_1.default.model('Account.Token');
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
                    /* --------------------------------------------------------------- */
                    let postmenToken = new TokenModel({
                        _id: '5b6ac09242f5024d308a6bd9',
                        name: 'Postman develop',
                        type: Models_1.TokenType.APPLICATION,
                        user: adminUser
                    });
                    await postmenToken.save();
                }
                catch (error) {
                    reject(error);
                }
                resolve();
            }));
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

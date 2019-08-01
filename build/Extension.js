"use strict";
/**
 * Extension.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const mongoose_1 = __importDefault(require("mongoose"));
const core_1 = require("@fastpanel/core");
const passport_local_1 = require("passport-local");
const passport_http_bearer_1 = require("passport-http-bearer");
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
                else if (!record.user) {
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
        this.events.once('cli:getCommands', (cli) => {
            const { Seeds } = require('./Commands/Seeds');
            (new Seeds(this.di)).initialize();
            const { Setup } = require('./Commands/Setup');
            (new Setup(this.di)).initialize();
        });
        this.events.once('db:getModels', (db) => {
            require('./Models/');
        });
        this.events.once('web:getMiddleware', (web) => {
            web.use(passport_1.default.initialize());
            web.use(passport_1.default.session());
        });
        this.events.once('web:getRoutes', (web) => { });
    }
    /**
     * Startup a service provider.
     */
    async startup() { }
}
exports.Extension = Extension;
/* End of file Extension.ts */ 

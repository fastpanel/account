"use strict";
/**
 * User.ts
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
;
/**
 *
 */
exports.UserSchema = new mongoose_1.default.Schema({
    nickname: {
        type: mongoose_1.default.Schema.Types.String,
        sparse: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    password: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
        bcrypt: true,
        hide: true
    },
    notes: {
        type: mongoose_1.default.Schema.Types.String,
        default: ''
    },
    parent: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Account.User',
        autopopulate: true
    },
    enabled: {
        type: mongoose_1.default.Schema.Types.Boolean,
        default: true
    }
}, {
    /* Set (collection) table name. */
    collection: 'accountUser',
    /* Logger date. */
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
    /* Current version of the record. */
    versionKey: 'version',
    /* Converts the mongoose document into a plain javascript object. */
    toObject: {
        getters: true,
        virtuals: true
    },
    toJSON: {
        getters: true,
        virtuals: true
    }
});
exports.UserSchema.plugin(require('mongoose-bcrypt'), {
    rounds: 10
});
exports.UserSchema.plugin(require('mongoose-hidden')(), {
    hidden: {
        version: false
    }
});
/**
 *
 */
exports.UserModel = mongoose_1.default.model('Account.User', exports.UserSchema);
/* End of file User.ts */ 

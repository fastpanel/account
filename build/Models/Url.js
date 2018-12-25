"use strict";
/**
 * Url.ts
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
exports.UrlSchema = new mongoose_1.default.Schema({
    /**
     * The owner of the token.
     */
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Account.User'
    },
    /**
     *
     */
    label: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Account.Label'
    },
    /**
     *
     */
    value: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
        sparse: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    /**
     * Status of the enabled record.
     */
    enabled: {
        type: mongoose_1.default.Schema.Types.Boolean,
        default: true
    }
}, {
    /* Set (collection) table name. */
    collection: 'accountUrl',
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
exports.UrlSchema.plugin(require('mongoose-autopopulate'));
exports.UrlSchema.plugin(require('mongoose-hidden')(), {
    hidden: {
        version: false
    }
});
exports.UrlModel = mongoose_1.default.model('Account.Url', exports.UrlSchema);
/* End of file Url.ts */ 

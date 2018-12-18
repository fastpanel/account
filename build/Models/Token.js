"use strict";
/**
 * Token.ts
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
/**
 * A set of token type definitions.
 */
var TokenType;
(function (TokenType) {
    TokenType["APPLICATION"] = "APPLICATION";
    TokenType["DEVICE"] = "DEVICE";
    TokenType["USER"] = "USER";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
;
;
/**
 *
 */
exports.TokenSchema = new mongoose_1.default.Schema({
    /**
     *
     */
    name: {
        type: mongoose_1.default.Schema.Types.String,
        default: ''
    },
    /**
     * The type of token for whom it was issued.
     */
    type: {
        type: mongoose_1.default.Schema.Types.String,
        enum: [
            TokenType.APPLICATION,
            TokenType.DEVICE,
            TokenType.USER
        ],
        default: TokenType.USER
    },
    /**
     * The owner of the token.
     */
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Account.User',
        autopopulate: true
    },
    /**
     * The token expiration time.
     */
    expiresAt: {
        type: mongoose_1.default.Schema.Types.Date,
        default: null
    },
    /**
     * Status of the enabled record.
     */
    enabled: {
        type: Boolean,
        default: true
    }
}, {
    /* Set (collection) table name. */
    collection: 'accountToken',
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
/* Init plugins. */
exports.TokenSchema.plugin(require('mongoose-autopopulate'));
exports.TokenSchema.plugin(require('mongoose-hidden')(), {
    hidden: {
        version: false
    }
});
/**
 *
 */
exports.TokenModel = mongoose_1.default.model('Account.Token', exports.TokenSchema);
/* End of file Token.ts */ 

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
;
/**
 *
 */
exports.TokenSchema = new mongoose_1.default.Schema({
    /* Status of the enabled record. */
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
/**
 *
 */
exports.TokenModel = mongoose_1.default.model('Account.Token', exports.TokenSchema);
/* End of file Token.ts */ 

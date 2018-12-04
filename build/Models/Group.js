"use strict";
/**
 * Group.ts
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
exports.GroupSchema = new mongoose_1.default.Schema({
    /**
     *
     */
    alias: {
        type: mongoose_1.default.Schema.Types.String,
        sparse: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    /**
     *
     */
    label: {
        type: mongoose_1.default.Schema.Types.String,
        default: ''
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
    collection: 'accountGroup',
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
exports.GroupSchema.plugin(require('mongoose-autopopulate'));
/**
 *
 */
exports.GroupModel = mongoose_1.default.model('Account.Group', exports.GroupSchema);
/* End of file Group.ts */ 

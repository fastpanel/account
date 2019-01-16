"use strict";
/**
 * Organization.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
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
exports.OrganizationSchema = new mongoose_1.default.Schema({
    /**
     * Status of the enabled record.
     */
    enabled: {
        type: mongoose_1.default.Schema.Types.Boolean,
        default: true
    }
}, {
    /* Set (collection) table name. */
    collection: 'accountOrganization',
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
exports.OrganizationSchema.plugin(require('mongoose-autopopulate'));
exports.OrganizationSchema.plugin(require('mongoose-hidden')(), {
    hidden: {
        version: false
    }
});
exports.OrganizationModel = mongoose_1.default.model('Account.Organization', exports.OrganizationSchema);
/* End of file Organization.ts */ 

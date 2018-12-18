"use strict";
/**
 * PostalAddress.ts
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
exports.PostalAddressSchema = new mongoose_1.default.Schema({
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
        ref: 'Account.Label',
        autopopulate: true
    },
    /**
     *
     */
    location: {
        street: {
            type: mongoose_1.default.Schema.Types.String,
            trim: true,
            default: ''
        },
        city: {
            type: mongoose_1.default.Schema.Types.String,
            trim: true,
            default: ''
        },
        state: {
            type: mongoose_1.default.Schema.Types.String,
            trim: true,
            default: ''
        },
        postalCode: {
            type: mongoose_1.default.Schema.Types.String,
            trim: true,
            default: ''
        },
        country: {
            type: mongoose_1.default.Schema.Types.String,
            trim: true,
            default: ''
        },
        countryCode: {
            type: mongoose_1.default.Schema.Types.String,
            trim: true,
            default: ''
        }
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
    collection: 'accountPostalAddress',
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
exports.PostalAddressSchema.plugin(require('mongoose-autopopulate'));
exports.PostalAddressSchema.plugin(require('mongoose-hidden')(), {
    hidden: {
        version: false
    }
});
exports.PostalAddressModel = mongoose_1.default.model('Account.PostalAddress', exports.PostalAddressSchema);
/* End of file PostalAddress.ts */ 

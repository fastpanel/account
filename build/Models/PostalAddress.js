"use strict";
/**
 * PostalAddress.ts
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
        ref: 'Account.Label'
    },
    /**
     * The name of the country.
     */
    country: {
        type: mongoose_1.default.Schema.Types.String,
        trim: true,
        default: ''
    },
    /**
     * Postal code. Usually country-wide,
     * but sometimes specific to the city
     * (e.g. "2" in "Dublin 2, Ireland" addresses).
     */
    postalCode: {
        type: mongoose_1.default.Schema.Types.String,
        trim: true,
        default: ''
    },
    /**
     * Covers actual P.O. boxes, drawers, locked bags, etc.
     * This is usually but not always mutually exclusive with street.
     */
    postalBox: {
        type: mongoose_1.default.Schema.Types.String,
        trim: true,
        default: ''
    },
    /**
     * A state, province, county (in Ireland),
     * Land (in Germany), departement (in France), etc.
     */
    region: {
        type: mongoose_1.default.Schema.Types.String,
        trim: true,
        default: ''
    },
    /**
     * Handles administrative districts such as U.S. or U.K.
     * counties that are not used for mail addressing purposes.
     * Subregion is not intended for delivery addresses.
     */
    subRegion: {
        type: mongoose_1.default.Schema.Types.String,
        trim: true,
        default: ''
    },
    /**
     * Can be city, village, town, borough, etc.
     * This is the postal town and not necessarily
     * the place of residence or place of business.
     */
    city: {
        type: mongoose_1.default.Schema.Types.String,
        trim: true,
        default: ''
    },
    /**
     * Can be street, avenue, road, etc.
     * This element also includes the house number
     * and room/apartment/flat/floor number.
     */
    street: {
        type: mongoose_1.default.Schema.Types.String,
        trim: true,
        default: ''
    },
    /**
     * Geolocation, point on the map.
     */
    location: {
        type: {
            type: mongoose_1.default.Schema.Types.String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [mongoose_1.default.Schema.Types.Number],
            required: true
        }
    },
    /**
     * Specifies the address as primary.
     */
    primary: {
        type: mongoose_1.default.Schema.Types.Boolean,
        default: false
    },
    /**
     * Any parameters in any form but preferably an object.
     */
    attrs: {
        type: mongoose_1.default.Schema.Types.Mixed,
        default: {}
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

/**
 * PostalAddress.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import Mongoose from 'mongoose';
import { IUser } from './User';
import { ILabel } from './Label';

export interface IPostalAddress extends Mongoose.Document {
  /**
   * The owner of the record.
   */
  user: IUser;
  
  /**
   * A general label for the address.
   */
  label: ILabel;
  
  /* ----------------------------------------------------------------------- */

  /**
   * The name of the country.
   */
  country: string;
  
  /**
   * Postal code. Usually country-wide, 
   * but sometimes specific to the city 
   * (e.g. "2" in "Dublin 2, Ireland" addresses).
   */
  postalCode: string;
  
  /**
   * Covers actual P.O. boxes, drawers, locked bags, etc. 
   * This is usually but not always mutually exclusive with street.
   */
  postalBox?: string;

  /**
   * A state, province, county (in Ireland), 
   * Land (in Germany), departement (in France), etc.
   */
  region: string;

  /**
   * Handles administrative districts such as U.S. or U.K. 
   * counties that are not used for mail addressing purposes. 
   * Subregion is not intended for delivery addresses.
   */
  subRegion?: string;
  
  /**
   * Can be city, village, town, borough, etc. 
   * This is the postal town and not necessarily 
   * the place of residence or place of business.
   */
  city: string;

  /**
   * Can be street, avenue, road, etc. 
   * This element also includes the house number 
   * and room/apartment/flat/floor number.
   */
  street: string;
  
  /**
   * Geolocation, point on the map.
   */
  location: {
    type: string,
    coordinates: Array<Number>
  };

  /**
   * Specifies the address as primary.
   */
  primary: boolean;

  /* ----------------------------------------------------------------------- */

  /**
   * Any parameters in any form but preferably an object.
   */
  attrs?: any;

  /**
   * Status of the enabled record.
   */
  enabled?: boolean;

  /* ----------------------------------------------------------------------- */

  /**
   * 
   */
  createdAt?: Date;

  /**
   * 
   */
  updatedAt?: Date;

  /**
   * Current version of the record.
   */
  version?: number;
};

export const PostalAddressSchema = new Mongoose.Schema({
  /**
   * The owner of the token.
   */
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Account.User'
  },

  /**
   * 
   */
  label: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Account.Label'
  },

  /**
   * The name of the country.
   */
  country: {
    type: Mongoose.Schema.Types.String,
    trim: true,
    default: ''
  },

  /**
   * Postal code. Usually country-wide, 
   * but sometimes specific to the city 
   * (e.g. "2" in "Dublin 2, Ireland" addresses).
   */
  postalCode: {
    type: Mongoose.Schema.Types.String,
    trim: true,
    default: ''
  },

  /**
   * Covers actual P.O. boxes, drawers, locked bags, etc. 
   * This is usually but not always mutually exclusive with street.
   */
  postalBox: {
    type: Mongoose.Schema.Types.String,
    trim: true,
    default: ''
  },

  /**
   * A state, province, county (in Ireland), 
   * Land (in Germany), departement (in France), etc.
   */
  region: {
    type: Mongoose.Schema.Types.String,
    trim: true,
    default: ''
  },

  /**
   * Handles administrative districts such as U.S. or U.K. 
   * counties that are not used for mail addressing purposes. 
   * Subregion is not intended for delivery addresses.
   */
  subRegion: {
    type: Mongoose.Schema.Types.String,
    trim: true,
    default: ''
  },

  /**
   * Can be city, village, town, borough, etc. 
   * This is the postal town and not necessarily 
   * the place of residence or place of business.
   */
  city: {
    type: Mongoose.Schema.Types.String,
    trim: true,
    default: ''
  },

  /**
   * Can be street, avenue, road, etc. 
   * This element also includes the house number 
   * and room/apartment/flat/floor number.
   */
  street: {
    type: Mongoose.Schema.Types.String,
    trim: true,
    default: ''
  },

  /**
   * Geolocation, point on the map.
   */
  location: {
    type: {
      type: Mongoose.Schema.Types.String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Mongoose.Schema.Types.Number],
      required: true
    }
  },
  
  /**
   * Specifies the address as primary.
   */
  primary: {
    type: Mongoose.Schema.Types.Boolean,
    default: false
  },

  /**
   * Any parameters in any form but preferably an object.
   */
  attrs: {
    type: Mongoose.Schema.Types.Mixed,
    default: {}
  },

  /**
   * Status of the enabled record.
   */
  enabled: {
    type: Mongoose.Schema.Types.Boolean,
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

PostalAddressSchema.plugin(require('mongoose-autopopulate'));
PostalAddressSchema.plugin(require('mongoose-hidden')(), {
  hidden: {
    version: false
  }
});

export const PostalAddressModel = Mongoose.model<IPostalAddress>('Account.PostalAddress', PostalAddressSchema);

/* End of file PostalAddress.ts */
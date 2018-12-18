/**
 * PostalAddress.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
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
   * 
   */
  label: ILabel;
  
  /**
   * 
   */
  location: {
    /**
     * 
     */
    street: string,
    
    /**
     * 
     */
    city: string,
    
    /**
     * 
     */
    state: string,
    
    /**
     * 
     */
    postalCode: string,
    
    /**
     * 
     */
    country: string,
    
    /**
     * 
     */
    countryCode: string,
  };
  
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
    ref: 'Account.Label',
    autopopulate: true
  },
  
  /**
   * 
   */
  location: {
    street: {
      type: Mongoose.Schema.Types.String,
      trim: true,
      default: ''
    },
    city: {
      type: Mongoose.Schema.Types.String,
      trim: true,
      default: ''
    },
    state: {
      type: Mongoose.Schema.Types.String,
      trim: true,
      default: ''
    },
    postalCode: {
      type: Mongoose.Schema.Types.String,
      trim: true,
      default: ''
    },
    country: {
      type: Mongoose.Schema.Types.String,
      trim: true,
      default: ''
    },
    countryCode: {
      type: Mongoose.Schema.Types.String,
      trim: true,
      default: ''
    }
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
/**
 * EmailAddress.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */

import Mongoose from 'mongoose';
import { IUser } from './User';
import { ILabel } from './Label';

export interface IEmailAddress extends Mongoose.Document {
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
  value: string;
  
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

export const EmailAddressSchema = new Mongoose.Schema({
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
   * 
   */
  value: {
    type: Mongoose.Schema.Types.String,
    required: true,
    sparse: true,
    unique: true,
    uniqueCaseInsensitive: true
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
  collection: 'accountEmailAddress',
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

EmailAddressSchema.plugin(require('mongoose-autopopulate'));
EmailAddressSchema.plugin(require('mongoose-hidden')(), {
  hidden: {
    version: false
  }
});

export const EmailAddressModel = Mongoose.model<IEmailAddress>('Account.EmailAddress', EmailAddressSchema);

/* End of file EmailAddress.ts */
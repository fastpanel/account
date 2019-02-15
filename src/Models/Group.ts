/**
 * Group.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import Mongoose from 'mongoose';
import { IUser } from './User';

/**
 * 
 */
export interface IGroup extends Mongoose.Document {
  /**
   * 
   */
  alias: string;

  /**
   * 
   */
  label: string;
  
  /**
   * Icon for visual group definition.
   */
  icon?: string;

  /**
   * 
   */
  readonly users: Array<IUser>;

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

/**
 * 
 */
export const GroupSchema = new Mongoose.Schema({
  /**
   * 
   */
  alias: {
    type: Mongoose.Schema.Types.String,
    sparse: true,
    unique: true,
    uniqueCaseInsensitive: true
  },

  /**
   * 
   */
  label: {
    type: Mongoose.Schema.Types.String,
    default: ''
  },

  /**
   * Icon for visual group definition.
   */
  icon: {
    type: Mongoose.Schema.Types.String,
    default: ''
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

/**
 * 
 */
GroupSchema.virtual('users', {
  ref: 'Account.User',
  localField: '_id',
  foreignField: 'group'
});

/* Init plugins. */
GroupSchema.plugin(require('mongoose-autopopulate'));
GroupSchema.plugin(require('mongoose-hidden')(), {
  hidden: {
    version: false
  }
});

/**
 * 
 */
export const GroupModel = Mongoose.model<IGroup>('Account.Group', GroupSchema);

/* End of file Group.ts */
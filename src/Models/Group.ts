/**
 * Group.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */

import Mongoose from 'mongoose';

/**
 * 
 */
export interface IGroup extends Mongoose.Document {
  /* ----------------------------------------------------------------------- */
  createdAt?: Date;
  updatedAt?: Date;
  version?: number;
  /* ----------------------------------------------------------------------- */
  enabled?: boolean;
};

/**
 * 
 */
export const GroupSchema = new Mongoose.Schema({
  /* Status of the enabled record. */
  enabled: {
    type: Boolean,
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
export const GroupModel = Mongoose.model<IGroup>('Account.Group', GroupSchema);

/* End of file Group.ts */
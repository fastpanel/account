/**
 * Label.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import Mongoose from 'mongoose';

/**
 * A set of label target definitions.
 */
export enum LabelTarget {
  PHONE  = 'PHONE',
  EMAIL  = 'EMAIL',
  POSTAL = 'POSTAL',
  URL    = 'URL'
};

/**
 * 
 */
export interface ILabel extends Mongoose.Document {
  /**
   * 
   */
  alias: string;
  
  /**
   * 
   */
  title: string;

  /**
   * 
   */
  target: Array<LabelTarget>;
  
  /* ----------------------------------------------------------------------- */

  /**
   * Any parameters in any form but preferably an object.
   */
  attrs?: any,

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
export const LabelSchema = new Mongoose.Schema({
  /**
   * 
   */
  alias: {
    type: Mongoose.Schema.Types.String,
    sparse: true,
    unique: true,
    required: true,
    uniqueCaseInsensitive: true
  },
  
  /**
   * 
   */
  title: {
    type: Mongoose.Schema.Types.String,
    default: ''
  },
  
  /**
   * 
   */
  target: {
    type: [Mongoose.Schema.Types.String],
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
  collection: 'accountLabel',
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

LabelSchema.plugin(require('mongoose-autopopulate'));
LabelSchema.plugin(require('mongoose-hidden')(), {
  hidden: {
    version: false
  }
});

export const LabelModel = Mongoose.model<ILabel>('Account.Label', LabelSchema);

/* End of file Label.ts */
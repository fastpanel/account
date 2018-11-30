/**
 * User.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */

import Mongoose from 'mongoose';

/**
 * 
 */
export interface IUser extends Mongoose.Document {
  /**
   * User full name fields.
   */
  name: {
    /**
     * 
     */
    given?: string,

    /**
     * 
     */
    middle?: string,

    /**
     * 
     */
    family?: string,

    /**
     * 
     */
    prefix?: string,

    /**
     * 
     */
    suffix?: string,

    /**
     * 
     */
    displayName: string,

    /**
     * 
     */
    phonetic?: {
      /**
       * 
       */
      given?: string,

      /**
       * 
       */
      middle?: string,

      /**
       * 
       */
      family?: string
    }
  };
  
  /**
   * 
   */
  nickname?: string;

  /**
   * Password for login.
   */
  password: string;

  /**
   * 
   */
  notes?: string;
  
  /**
   * A user who is directly or indirectly related to this account.
   */
  parent?: IUser;

  /**
   * Status of the enabled record.
   */
  enabled?: boolean;

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
export const UserSchema = new Mongoose.Schema({
  nickname: {
    type: Mongoose.Schema.Types.String,
    sparse: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  password: {
    type: Mongoose.Schema.Types.String, 
    required: true, 
    bcrypt: true,
    hide: true
  },
  notes: {
    type: Mongoose.Schema.Types.String,
    default: ''
  },
  parent: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Account.User',
    autopopulate: true
  },
  enabled: {
    type: Mongoose.Schema.Types.Boolean,
    default: true
  }
}, {
  /* Set (collection) table name. */
  collection: 'accountUser',
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

UserSchema.plugin(require('mongoose-bcrypt'), { 
  rounds: 10
});
UserSchema.plugin(require('mongoose-hidden')(), {
  hidden: {
    version: false
  }
});

/**
 * 
 */
export const UserModel = Mongoose.model<IUser>('Account.User', UserSchema);

/* End of file User.ts */
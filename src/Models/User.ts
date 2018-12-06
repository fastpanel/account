/**
 * User.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */

import Mongoose from 'mongoose';
import { IGroup } from './Group';

/**
 * 
 */
export interface IUser extends Mongoose.Document {
  /**
   * 
   */
  group: IGroup;

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
  password?: string;

  /**
   * 
   */
  notes?: string;
  
  /**
   * A users who is directly or indirectly related to this account.
   */
  parents?: Array<IUser>;

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

  /* ----------------------------------------------------------------------- */
  
  /**
   * Async password verification function.
   * 
   * @param password Password in clear text.
   */
  verifyPassword(password: string): Promise<boolean>;

  /**
   * Sync password verification function.
   * 
   * @param password Password in clear text.
   */
  verifyPasswordSync(password: string): boolean;

};

/**
 * 
 */
export const UserSchema = new Mongoose.Schema({
  /**
   * 
   */
  group: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Account.Group',
    autopopulate: true
  },

  /**
   * User full name fields.
   */
  name: {
    given: {
      type: Mongoose.Schema.Types.String,
      trim: true,
      default: ''
    },
    middle: {
      type: Mongoose.Schema.Types.String,
      trim: true,
      default: ''
    },
    family: {
      type: Mongoose.Schema.Types.String,
      trim: true,
      default: ''
    },
    prefix: {
      type: Mongoose.Schema.Types.String,
      trim: true,
      default: ''
    },
    suffix: {
      type: Mongoose.Schema.Types.String,
      trim: true,
      default: ''
    },
    displayName: {
      type: Mongoose.Schema.Types.String,
      required: true,
      trim: true
    },
    phonetic: {
      given: {
        type: Mongoose.Schema.Types.String,
        trim: true,
        default: ''
      },
      middle: {
        type: Mongoose.Schema.Types.String,
        trim: true,
        default: ''
      },
      family: {
        type: Mongoose.Schema.Types.String,
        trim: true,
        default: ''
      }
    }
  },

  /**
   * 
   */
  nickname: {
    type: Mongoose.Schema.Types.String,
    sparse: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  
  /**
   * Password for login.
   */
  password: {
    type: Mongoose.Schema.Types.String, 
    required: true, 
    bcrypt: true,
    hide: true
  },
  
  /**
   * 
   */
  notes: {
    type: Mongoose.Schema.Types.String,
    default: ''
  },
  
  /**
   * A users who is directly or indirectly related to this account.
   */
  parents: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Account.User',
      autopopulate: true
    }
  ],
  
  /**
   * Status of the enabled record.
   */
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

/* Init plugins. */
UserSchema.plugin(require('mongoose-autopopulate'));
UserSchema.plugin(require('mongoose-hidden')(), {
  hidden: {
    version: false
  }
});
UserSchema.plugin(require('mongoose-bcrypt'), { 
  rounds: 10
});

/**
 * 
 */
export const UserModel = Mongoose.model<IUser>('Account.User', UserSchema);

/* End of file User.ts */
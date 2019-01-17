/**
 * User.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import Mongoose from 'mongoose';
import { IGroup } from './Group';
import { IPhoneNumber } from './PhoneNumber';
import { IEmailAddress } from './EmailAddress';
import { IPostalAddress } from './PostalAddress';
import { IUrl } from './Url';

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
     * The given name of the contact.
     */
    given?: string,

    /**
     * The middle name of the contact.
     */
    middle?: string,

    /**
     * The family name of the contact.
     */
    family?: string,

    /**
     * The name prefix of the contact.
     */
    prefix?: string,

    /**
     * The name suffix of the contact.
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
       * The phonetic given name of the contact.
       */
      given?: string,

      /**
       * The phonetic middle name of the contact.
       */
      middle?: string,

      /**
       * A string for the phonetic family name of the contact.
       */
      family?: string
    }
  };
  
  /**
   * The nickname of the contact.
   */
  nickname?: string;

  /**
   * Password for login.
   */
  password?: string;

  /**
   * A string containing notes for the contact.
   */
  notes?: string;
  
  /**
   * A users who is directly or indirectly related to this account.
   */
  parents?: Array<IUser>;

  /**
   * 
   */
  birthday?: Date;

  /**
   * 
   */
  organization?: IUser;
  
  /**
   * 
   */
  position?: string;
  
  /**
   * 
   */
  department?: string;
  
  /**
   * n array of labeled phone numbers for a contact.
   */
  phoneNumbers: Array<IPhoneNumber>;

  /**
   * An array of labeled email addresses for the contact.
   */
  emailAddresses: Array<IEmailAddress>;

  /**
   * An array of labeled postal addresses for a contact.
   */
  postalAddresses: Array<IPostalAddress>;

  /**
   * An array of labeled URL addresses for a contact.
   */
  urls: Array<IUrl>;

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
    default: null
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
    default: null
  },
  
  /**
   * Password for login.
   */
  password: {
    type: Mongoose.Schema.Types.String,
    bcrypt: true,
    hide: true,
    default: null
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
      ref: 'Account.User'
    }
  ],
  
  /**
   * 
   */
  birthday: {
    type: Mongoose.Schema.Types.Date,
    default: null
  },

  /**
   * 
   */
  organization: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Account.User',
    default: null
  },
  
  /**
   * 
   */
  position: {
    type: Mongoose.Schema.Types.String,
    default: ''
  },

  /**
   * 
   */
  department: {
    type: Mongoose.Schema.Types.String,
    default: ''
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

/**
 * 
 */
UserSchema.virtual('phoneNumbers', {
  ref: 'Account.PhoneNumber',
  localField: '_id',
  foreignField: 'user'
});

/**
 * 
 */
UserSchema.virtual('emailAddresses', {
  ref: 'Account.EmailAddress',
  localField: '_id',
  foreignField: 'user'
});

/**
 * 
 */
UserSchema.virtual('postalAddresses', {
  ref: 'Account.PostalAddress',
  localField: '_id',
  foreignField: 'user'
});

/**
 * 
 */
UserSchema.virtual('urls', {
  ref: 'Account.Url',
  localField: '_id',
  foreignField: 'user'
});

/**
 * 
 */
UserSchema.index({
  nickname: 1
}, {
  name: "nickname_idx",
  unique: true,
  collation: {
    locale: "en",
    strength: 2
  },
  partialFilterExpression: {
    nickname: {
      $type: "string" 
    }
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
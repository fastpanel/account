/**
 * User.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
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
   * The nickname (login) of the contact.
   */
  nickname?: string;

  /**
   * The email of the contact.
   */
  email?: string;

  /**
   * The phone number of the contact.
   */
  phone?: string;

  /**
   * Password for login.
   */
  password?: string;

  /**
   * A string containing notes for the contact.
   */
  notes?: string;
  
  /**
   * 
   */
  birthday?: Date;

  /**
   * 
   */
  organization?: string;
  
  /**
   * 
   */
  position?: string;
  
  /**
   * 
   */
  department?: string;
  
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
   * The nickname (login) of the contact.
   */
  nickname: {
    type: Mongoose.Schema.Types.String,
    default: null
  },
  
  /**
   * The email of the contact.
   */
  email: {
    type: Mongoose.Schema.Types.String,
    default: null
  },
  
  /**
   * The phone number of the contact.
   */
  phone: {
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
   * A users who is related to this account.
   */
  parents: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: 'Account.User'
    }
  ],
  
  /**
   * The list of users who look after this account. 
   * This can be either sales managers or supervisors or accountants, 
   * depending on the conditions of use.
   */
  managers: [
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
    type: Mongoose.Schema.Types.String,
    default: ''
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

/**
 * 
 */
UserSchema.index({
  email: 1
}, {
  name: "email_idx",
  unique: true,
  collation: {
    locale: "en",
    strength: 2
  },
  partialFilterExpression: {
    email: {
      $type: "string" 
    }
  }
});

/**
 * 
 */
UserSchema.index({
  phone: 1
}, {
  name: "phone_idx",
  unique: true,
  collation: {
    locale: "en",
    strength: 2
  },
  partialFilterExpression: {
    phone: {
      $type: "string" 
    }
  }
});

/* Init plugins. */
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
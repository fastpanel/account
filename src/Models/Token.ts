/**
 * Token.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */

import Mongoose from 'mongoose';
import { IUser } from './User';

/**
 * A set of token type definitions.
 */
export enum TokenType {
  APPLICATION = 'APPLICATION',
  DEVICE = 'DEVICE',
  USER = 'USER'
}

/**
 * 
 */
export interface IToken extends Mongoose.Document {
  /**
   * 
   */
  name?: string;

  /**
   * The type of token for whom it was issued.
   */
  type?: TokenType;

  /**
   * The owner of the token.
   */
  user: IUser;
  
  /**
   * The token expiration time.
   */
  expiresAt: Date;

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
export const TokenSchema = new Mongoose.Schema({
  /**
   * 
   */
  name: {
    type: Mongoose.Schema.Types.String,
    default: ''
  },

  /**
   * The type of token for whom it was issued.
   */
  type: {
    type: Mongoose.Schema.Types.String,
    enum: [
      TokenType.APPLICATION,
      TokenType.DEVICE,
      TokenType.USER
    ],
    default: TokenType.USER
  },

  /**
   * The owner of the token.
   */
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'Account.User',
    autopopulate: true
  },

  /**
   * The token expiration time.
   */
  expiresAt: {
    type: Mongoose.Schema.Types.Date,
    default: null
  },

  /**
   * Status of the enabled record.
   */
  enabled: {
    type: Boolean,
    default: true
  }
}, {
  /* Set (collection) table name. */
  collection: 'accountToken',
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
TokenSchema.plugin(require('mongoose-autopopulate'));

/**
 * 
 */
export const TokenModel = Mongoose.model<IToken>('Account.Token', TokenSchema);

/* End of file Token.ts */
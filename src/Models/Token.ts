/**
 * Token.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
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
};

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

/**
 * Token.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */

import Mongoose from 'mongoose';

/**
 * 
 */
export interface IToken extends Mongoose.Document {};

/**
 * 
 */
export const TokenSchema = new Mongoose.Schema({});

/**
 * 
 */
export const TokenModel = Mongoose.model<IToken>('Account.Token', TokenSchema);

/* End of file Token.ts */
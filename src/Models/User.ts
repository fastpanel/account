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
export interface IUser extends Mongoose.Document {};

/**
 * 
 */
export const UserSchema = new Mongoose.Schema({});

/**
 * 
 */
export const UserModel = Mongoose.model<IUser>('Account.User', UserSchema);

/* End of file User.ts */
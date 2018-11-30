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
    createdAt?: Date;
    updatedAt?: Date;
    version?: number;
    enabled?: boolean;
}
/**
 *
 */
export declare const UserSchema: Mongoose.Schema;
/**
 *
 */
export declare const UserModel: Mongoose.Model<IUser, {}>;

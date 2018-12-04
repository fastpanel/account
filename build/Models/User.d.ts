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
        given?: string;
        /**
         *
         */
        middle?: string;
        /**
         *
         */
        family?: string;
        /**
         *
         */
        prefix?: string;
        /**
         *
         */
        suffix?: string;
        /**
         *
         */
        displayName: string;
        /**
         *
         */
        phonetic?: {
            /**
             *
             */
            given?: string;
            /**
             *
             */
            middle?: string;
            /**
             *
             */
            family?: string;
        };
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
}
/**
 *
 */
export declare const UserSchema: Mongoose.Schema;
/**
 *
 */
export declare const UserModel: Mongoose.Model<IUser, {}>;

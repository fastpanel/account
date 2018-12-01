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
}
/**
 *
 */
export declare const UserSchema: Mongoose.Schema;
/**
 *
 */
export declare const UserModel: Mongoose.Model<IUser, {}>;

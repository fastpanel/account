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
        given?: string;
        /**
         * The middle name of the contact.
         */
        middle?: string;
        /**
         * The family name of the contact.
         */
        family?: string;
        /**
         * The name prefix of the contact.
         */
        prefix?: string;
        /**
         * The name suffix of the contact.
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
             * The phonetic given name of the contact.
             */
            given?: string;
            /**
             * The phonetic middle name of the contact.
             */
            middle?: string;
            /**
             * A string for the phonetic family name of the contact.
             */
            family?: string;
        };
    };
    /**
     * The nickname (login) of the contact.
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
     * A users who is related to this account.
     */
    parents?: Array<IUser>;
    /**
     * The list of users who look after this account.
     * This can be either sales managers or supervisors or accountants,
     * depending on the conditions of use.
     */
    managers?: Array<IUser>;
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
     * An array of labeled phone numbers for a contact.
     */
    readonly phoneNumbers: Array<IPhoneNumber>;
    /**
     * An array of labeled email addresses for the contact.
     */
    readonly emailAddresses: Array<IEmailAddress>;
    /**
     * An array of labeled postal addresses for a contact.
     */
    readonly postalAddresses: Array<IPostalAddress>;
    /**
     * An array of labeled URL addresses for a contact.
     */
    readonly urls: Array<IUrl>;
    /**
     * Any parameters in any form but preferably an object.
     */
    attrs?: any;
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
}
/**
 *
 */
export declare const UserSchema: Mongoose.Schema<any>;
/**
 *
 */
export declare const UserModel: Mongoose.Model<IUser, {}>;

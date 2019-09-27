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

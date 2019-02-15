/**
 * EmailAddress.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
import Mongoose from 'mongoose';
import { IUser } from './User';
import { ILabel } from './Label';
export interface IEmailAddress extends Mongoose.Document {
    /**
     * The owner of the record.
     */
    user: IUser;
    /**
     *
     */
    label: ILabel;
    /**
     *
     */
    value: string;
    /**
     * Specifies the email as primary.
     */
    primary: boolean;
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
}
export declare const EmailAddressSchema: Mongoose.Schema<any>;
export declare const EmailAddressModel: Mongoose.Model<IEmailAddress, {}>;

/**
 * PostalAddress.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */
import Mongoose from 'mongoose';
import { IUser } from './User';
import { ILabel } from './Label';
export interface IPostalAddress extends Mongoose.Document {
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
    location: {
        /**
         *
         */
        street: string;
        /**
         *
         */
        city: string;
        /**
         *
         */
        state: string;
        /**
         *
         */
        postalCode: string;
        /**
         *
         */
        country: string;
        /**
         *
         */
        countryCode: string;
    };
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
export declare const PostalAddressSchema: Mongoose.Schema;
export declare const PostalAddressModel: Mongoose.Model<IPostalAddress, {}>;

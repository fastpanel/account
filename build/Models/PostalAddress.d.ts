/**
 * PostalAddress.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
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
     * A general label for the address.
     */
    label: ILabel;
    /**
     * The name of the country.
     */
    country: string;
    /**
     * Postal code. Usually country-wide,
     * but sometimes specific to the city
     * (e.g. "2" in "Dublin 2, Ireland" addresses).
     */
    postalCode: string;
    /**
     * Covers actual P.O. boxes, drawers, locked bags, etc.
     * This is usually but not always mutually exclusive with street.
     */
    postalBox?: string;
    /**
     * A state, province, county (in Ireland),
     * Land (in Germany), departement (in France), etc.
     */
    region: string;
    /**
     * Handles administrative districts such as U.S. or U.K.
     * counties that are not used for mail addressing purposes.
     * Subregion is not intended for delivery addresses.
     */
    subRegion?: string;
    /**
     * Can be city, village, town, borough, etc.
     * This is the postal town and not necessarily
     * the place of residence or place of business.
     */
    city: string;
    /**
     * Can be street, avenue, road, etc.
     * This element also includes the house number
     * and room/apartment/flat/floor number.
     */
    street: string;
    /**
     * Geolocation, point on the map.
     */
    location: {
        type: string;
        coordinates: Array<Number>;
    };
    /**
     * Specifies the address as primary.
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
export declare const PostalAddressSchema: Mongoose.Schema<any>;
export declare const PostalAddressModel: Mongoose.Model<IPostalAddress, {}>;

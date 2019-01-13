/**
 * Url.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
import Mongoose from 'mongoose';
import { IUser } from './User';
import { ILabel } from './Label';
export interface IUrl extends Mongoose.Document {
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
    value?: string;
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
export declare const UrlSchema: Mongoose.Schema;
export declare const UrlModel: Mongoose.Model<IUrl, {}>;

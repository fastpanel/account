/**
 * Group.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */
import Mongoose from 'mongoose';
import { IUser } from './User';
/**
 *
 */
export interface IGroup extends Mongoose.Document {
    /**
     *
     */
    alias: string;
    /**
     *
     */
    label: string;
    /**
     * Status of the enabled record.
     */
    enabled?: boolean;
    /**
     *
     */
    readonly users: Array<IUser>;
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
export declare const GroupSchema: Mongoose.Schema;
/**
 *
 */
export declare const GroupModel: Mongoose.Model<IGroup, {}>;

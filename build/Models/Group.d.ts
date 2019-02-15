/**
 * Group.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
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
     * Icon for visual group definition.
     */
    icon?: string;
    /**
     *
     */
    readonly users: Array<IUser>;
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
/**
 *
 */
export declare const GroupSchema: Mongoose.Schema<any>;
/**
 *
 */
export declare const GroupModel: Mongoose.Model<IGroup, {}>;

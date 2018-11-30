/**
 * Group.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */
import Mongoose from 'mongoose';
/**
 *
 */
export interface IGroup extends Mongoose.Document {
    createdAt?: Date;
    updatedAt?: Date;
    version?: number;
    enabled?: boolean;
}
/**
 *
 */
export declare const GroupSchema: Mongoose.Schema;
/**
 *
 */
export declare const GroupModel: Mongoose.Model<IGroup, {}>;

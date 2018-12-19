/**
 * Label.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */
import Mongoose from 'mongoose';
/**
 * A set of label target definitions.
 */
export declare enum LabelTarget {
    PHONE = 0,
    EMAIL = 1,
    POSTAL = 2,
    URL = 3
}
export interface ILabel extends Mongoose.Document {
    /**
     *
     */
    alias: string;
    /**
     *
     */
    title: string;
    /**
     *
     */
    target: Array<LabelTarget>;
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
export declare const LabelSchema: Mongoose.Schema;
export declare const LabelModel: Mongoose.Model<ILabel, {}>;
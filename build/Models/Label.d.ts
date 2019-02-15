/**
 * Label.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
import Mongoose from 'mongoose';
/**
 * A set of label target definitions.
 */
export declare enum LabelTarget {
    PHONE = "PHONE",
    EMAIL = "EMAIL",
    POSTAL = "POSTAL",
    URL = "URL"
}
/**
 *
 */
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
export declare const LabelSchema: Mongoose.Schema<any>;
export declare const LabelModel: Mongoose.Model<ILabel, {}>;

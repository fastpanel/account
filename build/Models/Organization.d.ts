/**
 * Organization.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */
import Mongoose from 'mongoose';
export interface IOrganization extends Mongoose.Document {
}
export declare const OrganizationSchema: Mongoose.Schema;
export declare const OrganizationModel: Mongoose.Model<IOrganization, {}>;

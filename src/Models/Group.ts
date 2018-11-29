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
export interface IGroup extends Mongoose.Document {};

/**
 * 
 */
export const GroupSchema = new Mongoose.Schema({});

/**
 * 
 */
export const GroupModel = Mongoose.model<IGroup>('Account.Group', GroupSchema);

/* End of file Group.ts */
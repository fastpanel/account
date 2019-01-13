/**
 * Organization.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import Mongoose from 'mongoose';

export interface IOrganization extends Mongoose.Document {

};

export const OrganizationSchema = new Mongoose.Schema({

}, {

});

OrganizationSchema.plugin(require('mongoose-autopopulate'));
OrganizationSchema.plugin(require('mongoose-hidden')(), {
  hidden: {
    version: false
  }
});

export const OrganizationModel = Mongoose.model<IOrganization>('Account.Organization', OrganizationSchema);

/* End of file Organization.ts */
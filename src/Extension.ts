/**
 * Extension.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */

import Vorpal from 'vorpal';
import MongoSE from 'mongoose';
import Passport from 'passport';
import { Strategy as PassportLocalStrategy } from 'passport-local';
import { Strategy as PassportBearerStrategy } from 'passport-http-bearer';
import { Extensions, Application } from 'fastpanel-core';

/**
 * Class Extension
 * 
 * Initialization of the extension.
 * 
 * @version 1.0.0
 */
export class Extension extends Extensions.ExtensionDefines {

  /**
   * Registers a service provider.
   */
  async register () : Promise<any> {
    this.events.once('app:setup', async (app: Application) => {});
    this.events.once('cli:getCommands', async (cli: Vorpal) => {});
    /* --------------------------------------------------------------------- */
    this.events.once('db:getModels', async (db: MongoSE.Connection) => {
      require('./Models/');
    });
    /* --------------------------------------------------------------------- */
    this.events.once('web:getMiddleware', async (web: Express.Application) => {});
    this.events.once('web:getRoutes', async (web: Express.Application) => {});
    /* --------------------------------------------------------------------- */
    this.events.once('socket:getMiddleware', async (socket: SocketIO.Server) => {});
    this.events.once('socket:getActions', async (socket: SocketIO.Server) => {});
    /* --------------------------------------------------------------------- */
    
  }
  
  /**
   * Startup a service provider.
   */
  async startup () : Promise<any> {}

}

/* End of file Extension.ts */
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
import { Extensions } from 'fastpanel-core';

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
    this.events.once('cli:getCommands', (cli: Vorpal) => {});
    /* --------------------------------------------------------------------- */
    this.events.once('db:getModels', (db: MongoSE.Connection) => {});
    /* --------------------------------------------------------------------- */
    this.events.once('web:getMiddleware', (web: Express.Application) => {});
    this.events.once('web:getRoutes', (web: Express.Application) => {});
    /* --------------------------------------------------------------------- */
    this.events.once('socket:getMiddleware', (socket: SocketIO.Server) => {});
    this.events.once('socket:getActions', (socket: SocketIO.Server) => {});
    /* --------------------------------------------------------------------- */
    
  }
  
  /**
   * Startup a service provider.
   */
  async startup () : Promise<any> {}

}

/* End of file Extension.ts */
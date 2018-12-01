"use strict";
/**
 * Extension.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fastpanel_core_1 = require("fastpanel-core");
/**
 * Class Extension
 *
 * Initialization of the extension.
 *
 * @version 1.0.0
 */
class Extension extends fastpanel_core_1.Extensions.ExtensionDefines {
    /**
     * Registers a service provider.
     */
    async register() {
        this.events.once('app:setup', async (app) => { });
        this.events.once('cli:getCommands', async (cli) => { });
        /* --------------------------------------------------------------------- */
        this.events.once('db:getModels', async (db) => {
            require('./Models/');
        });
        /* --------------------------------------------------------------------- */
        this.events.once('web:getMiddleware', async (web) => { });
        this.events.once('web:getRoutes', async (web) => { });
        /* --------------------------------------------------------------------- */
        this.events.once('socket:getMiddleware', async (socket) => { });
        this.events.once('socket:getActions', async (socket) => { });
        /* --------------------------------------------------------------------- */
    }
    /**
     * Startup a service provider.
     */
    async startup() { }
}
exports.Extension = Extension;
/* End of file Extension.ts */ 

"use strict";
/**
 * Seeds.js
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const core_1 = require("@fastpanel/core");
/**
 * Class Seeds
 *
 * @version 1.0.0
 */
class Seeds extends core_1.Cli.CommandDefines {
    /**
     * Initialize a commands provider.
     */
    initialize() {
        this.cli
            .command('@fastpanel/account seeds', 'Seeding account database data.')
            .option('-f, --fresh', 'Clear the base before filling.')
            .visible(false)
            .action((args, options, logger) => {
            return new Promise(async (resolve, reject) => {
                /* Info message. */
                logger.info(`${os_1.EOL}Seeding account database data.`);
                /* Command complete. */
                resolve();
            });
        });
    }
}
exports.Seeds = Seeds;
/* End of file Seeds.js */ 

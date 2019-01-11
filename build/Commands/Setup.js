"use strict";
/**
 * Setup.js
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@fastpanel/core");
/**
 * Class Setup
 *
 * @version 1.0.0
 */
class Setup extends core_1.Cli.CommandDefines {
    /**
     * Initialize a commands provider.
     */
    initialize() {
        this.cli
            .command('@fastpanel/account setup', 'Configure account components.')
            .option('-e, --env', 'Save as current environment settings.')
            .option('-f, --force', 'Forced command running.')
            .option('-y, --yes', 'Assume yes if prompted.')
            .visible(false)
            .action((args, options, logger) => {
            return new Promise(async (resolve, reject) => {
                logger.debug('@fastpanel/account setup');
                logger.debug(args);
                logger.debug(options);
                resolve();
            });
        });
    }
}
exports.Setup = Setup;
/* End of file Setup.js */ 

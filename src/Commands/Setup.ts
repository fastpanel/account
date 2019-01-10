/**
 * Setup.js
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import Winston from 'winston';
import { Cli } from '@fastpanel/core';

/**
 * Class Setup
 * 
 * @version 1.0.0
 */
export class Setup extends Cli.CommandDefines {
  
  /**
   * Initialize a commands provider.
   */
  public async initialize () : Promise<any> {
    this.cli
    .command('@fastpanel/account setup', 'Install account components.')
    .option('-f, --force', 'Forced reconfiguration of components.')
    .option('-e, --env', 'Save as current environment settings.')
    .option('-y, --yes', 'Assume yes if prompted.')
    .action((args: {[k: string]: any}, options: {[k: string]: any}, logger: Winston.Logger) => {
      return new Promise(async (resolve, reject) => {
        logger.debug('@fastpanel/account setup');
        logger.debug(args);
        logger.debug(options);
        resolve();
      });
    });
  }

}

/* End of file Setup.js */
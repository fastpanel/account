/**
 * Seeds.js
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import Winston from 'winston';
import { EOL } from 'os';
import { Cli } from '@fastpanel/core';

/**
 * Class Seeds
 * 
 * @version 1.0.0
 */
export class Seeds extends Cli.CommandDefines {
  
  /**
   * Initialize a commands provider.
   */
  public initialize () {
    this.cli
    .command('fastpanel/account seeds', 'Seeding account database data.')
    .option('-f, --fresh', 'Clear the base before filling.')
    .option('-d, --demo', 'Fill demo data.')
    .visible(false)
    .action((args: {[k: string]: any}, options: {[k: string]: any}, logger: Winston.Logger) => {
      return new Promise(async (resolve, reject) => {
        /* Command complete. */
        resolve();
      });
    });
  }

}

/* End of file Seeds.js */
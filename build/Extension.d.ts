/**
 * Extension.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
import { Extensions } from '@fastpanel/core';
/**
 * Class Extension
 *
 * Initialization of the extension.
 *
 * @version 1.0.0
 */
export declare class Extension extends Extensions.ExtensionDefines {
    /**
     * Registers a service provider.
     */
    register(): Promise<any>;
    /**
     * Startup a service provider.
     */
    startup(): Promise<any>;
}

/**
 * Auth.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
import { Request, Response, NextFunction } from 'express';
export declare class Auth {
    static handler(): (request: Request, response: Response, next: NextFunction) => Promise<void>;
}

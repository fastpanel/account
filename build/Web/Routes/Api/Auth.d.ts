/**
 * Auth.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
import { RoutDefines } from '@fastpanel/http';
import { Request, Response, NextFunction } from 'express';
/**
 * Class Auth
 *
 *
 *
 * @version 1.0.0
 */
export declare class Auth extends RoutDefines {
    /**
     * Initialize command.
     */
    initialize(): void;
    /**
     *
     * @param request
     * @param response
     */
    logInStatus(request: Request, response: Response): Promise<any>;
    /**
     *
     * @param request
     * @param response
     * @param next
     */
    logInAction(request: Request, response: Response, next: NextFunction): Promise<any>;
    /**
     *
     * @param request
     * @param response
     */
    logOutAction(request: Request, response: Response): Promise<any>;
}

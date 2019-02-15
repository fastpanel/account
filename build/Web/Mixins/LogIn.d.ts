/**
 * LogIn.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
import { Di } from '@fastpanel/core';
import { Request, Response, NextFunction } from 'express';
/**
 *
 * @param superClass
 */
export declare const LogIn: (superClass: any) => {
    new (di?: Di.Container): {
        [x: string]: any;
        /**
         * Initialize command.
         */
        initialize(): void;
        /**
         *
         * @param request
         * @param response
         * @param next
         */
        logInAction(request: Request, response: Response, next: NextFunction): Promise<any>;
    };
    [x: string]: any;
};

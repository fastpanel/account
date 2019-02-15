/**
 * LogAs.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
import { Di } from '@fastpanel/core';
import { Request, Response } from 'express';
/**
 *
 * @param superClass
 */
export declare const LogAs: (superClass: any) => {
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
         */
        LogAsAction(request: Request, response: Response): Promise<any>;
    };
    [x: string]: any;
};

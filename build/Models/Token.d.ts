/**
 * Token.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */
import Mongoose from 'mongoose';
/**
 *
 */
export interface IToken extends Mongoose.Document {
}
/**
 *
 */
export declare const TokenSchema: Mongoose.Schema;
/**
 *
 */
export declare const TokenModel: Mongoose.Model<IToken, {}>;

"use strict";
/**
 * User.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2018 Desionlab
 * @license   MIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
/**
 *
 */
exports.UserSchema = new mongoose_1.default.Schema({});
/**
 *
 */
exports.UserModel = mongoose_1.default.model('Account.User', exports.UserSchema);
/* End of file User.ts */ 

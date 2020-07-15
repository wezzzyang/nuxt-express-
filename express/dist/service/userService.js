"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminModel_1 = __importDefault(require("../model/adminModel"));
let adminmodel = new adminModel_1.default();
class userService {
    constructor() {
    }
    findLogin(act, pwd, test) {
        adminmodel.findLogin(act, pwd, test);
    }
    updateUser(act, pwd, test) {
        adminmodel.updateUser(act, pwd, test);
    }
}
exports.default = userService;

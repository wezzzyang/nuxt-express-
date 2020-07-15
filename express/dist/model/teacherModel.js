"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
class teacherModel {
    constructor() {
    }
    findLogin(act, pwd, test) {
        let results = {};
        let sql = `select * from teacher where account = '${act}' && password = '${pwd}'`;
        db_1.default.query(sql, function (err, rows) {
            results = rows;
            if (err) {
                test({ judge: "fail" });
                return {};
            }
            if (!Array.isArray(results) || results.length === 0) {
                test({ judge: "fail" });
            }
            else {
                test({ judge: "success", user: results[0] });
            }
        });
    }
    updateUser(act, pwd, test) {
        let results = {};
        db_1.default.query(`UPDATE teacher SET PASSWORD = '${pwd}' where account = '${act}'`, function (err, rows) {
            results = rows;
            if (err) {
                test({ judge: "fail" });
                return {};
            }
            if (results.affectedRows === 0) {
                test({ judge: "fail" });
            }
            else {
                test({ judge: "success" });
            }
        });
    }
}
exports.default = teacherModel;

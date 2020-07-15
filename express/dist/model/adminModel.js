"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
class adminModel {
    constructor() {
    }
    findLogin(act, pwd, test) {
        let results = {};
        let sql = `select * from admin where account = '${act}' && password = '${pwd}'`;
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
        db_1.default.query(`UPDATE ADMIN SET PASSWORD = '${pwd}' where account = '${act}'`, function (err, rows) {
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
    findAllUser(test) {
        let results = {};
        db_1.default.query(`select * from student`, function (err, studentRows) {
            db_1.default.query(`SELECT * FROM TEACHER`, function (err, teacherRows) {
                results = [...studentRows, ...teacherRows];
                if (err) {
                    test([]);
                    return {};
                }
                if (results.affectedRows === 0) {
                    test([]);
                }
                else {
                    test(results);
                }
            });
        });
    }
    //查找
    searchUser(keyword, test) {
        let results = {};
        db_1.default.query(`select * from student where account like '%${keyword}%' or name like '%${keyword}%' or department like '%${keyword}%' or major like '%${keyword}%'`, function (err, studentRows) {
            db_1.default.query(`SELECT * FROM TEACHER where account like '%${keyword}%' or name like '%${keyword}%' or department like '%${keyword}%'`, function (err, teacherRows) {
                results = [...studentRows, ...teacherRows];
                console.log('results: ', results);
                if (err) {
                    test([]);
                    return {};
                }
                if (results.affectedRows === 0) {
                    test([]);
                }
                else {
                    test(results);
                }
            });
        });
    }
}
exports.default = adminModel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
class materialModel {
    constructor() {
    }
    //添加教学资料
    upload(newMaterial, test) {
        let search = this.search;
        let results = {};
        let sql = `INSERT INTO Material (name,saveUrl,uploader,uploadTime,size,downloadUrl) VALUES ('${newMaterial.name}','${newMaterial.saveUrl}','${newMaterial.uploader}','${newMaterial.uploadTime}','${newMaterial.size}','${newMaterial.downloadUrl}')`;
        db_1.default.query(sql, function (err, rows) {
            results = rows;
            if (err) {
                test({ judge: "fail" });
                return {};
            }
            if (results.affectedRows === 0) {
                test({ judge: "fail" });
            }
            else {
                search('', test);
            }
        });
    }
    //删除教学资料
    delete(deleteID, test) {
        let search = this.search;
        let results = {};
        let sql = `DELETE FROM Material WHERE id ='${deleteID}'`;
        db_1.default.query(sql, function (err, rows) {
            results = rows;
            if (err) {
                test({ judge: "fail" });
                return {};
            }
            if (results.affectedRows === 0) {
                test({ judge: "fail" });
            }
            else {
                search('', test);
            }
        });
    }
    //查找教学资料
    search(keyword, test) {
        let results = {};
        let sql = `select * from Material where name like '%${keyword}%' or uploader like '%${keyword}%';`;
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
                test(results);
            }
        });
    }
}
exports.default = materialModel;

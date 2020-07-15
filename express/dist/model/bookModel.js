"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
class bookModel {
    constructor() {
    }
    //找到所有书籍
    findAllBook(test) {
        let results = {};
        let sql = `select * from book`;
        db_1.default.query(sql, function (err, rows) {
            results = rows;
            if (err) {
                test([]);
                return {};
            }
            if (!Array.isArray(results) || results.length === 0) {
                test([]);
            }
            else {
                test(results);
            }
        });
    }
    //添加书籍
    addBook(newBook, test) {
        let findAllBook = this.findAllBook;
        let results = {};
        let sql = `INSERT INTO BOOK (BOOKID,BOOKNAME,AUTHOR,MAJOR,PUBLISHER,BEIZHU) VALUES ('${newBook.bookID}','${newBook.bookName}','${newBook.author}','${newBook.major}','${newBook.publisher}','${newBook.beiZhu}')`;
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
                findAllBook(test);
            }
        });
    }
    //删除书籍
    deleteBook(deleteID, test) {
        let findAllBook = this.findAllBook;
        let results = {};
        let sql = `DELETE FROM BOOK WHERE BOOKID ='${deleteID}'`;
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
                findAllBook(test);
            }
        });
    }
    //更新书籍
    updateBook(newBook, test) {
        let findAllBook = this.findAllBook;
        let results = {};
        let sql = `UPDATE BOOK SET BOOKNAME = '${newBook.bookName}', AUTHOR = '${newBook.author}', MAJOR = '${newBook.major}', PUBLISHER = '${newBook.publisher}', BEIZHU = '${newBook.beiZhu}' WHERE BOOKID = '${newBook.bookID}'`;
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
                findAllBook(test);
            }
        });
    }
    //查找拥有
    searchMyMajorBook(major, test) {
        let results = {};
        let sql = `select * from book where major = '${major}'`;
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
    //查找
    searchBook(keyword, test) {
        let results = {};
        let sql = `select * from book where bookName like '%${keyword}%' or author like '%${keyword}%' or publisher like '%${keyword}%' or major like '%${keyword}%' or beiZhu like '%${keyword}%' ;`;
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
exports.default = bookModel;

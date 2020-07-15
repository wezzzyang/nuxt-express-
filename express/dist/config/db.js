"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ctdms'
});
let db = {
    query: function (sql, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            //Use the connection
            connection.query(sql, function (err, results, fields) {
                if (err) {
                    return callback(err);
                }
                //只是释放链接，在缓冲池了，没有被销毁
                connection.release();
                //每次查询都会 回调
                callback(err, results);
            });
        });
    }
};
exports.default = db;
// let connection:any = mysql.createConnection(config);
// export default connection;
//connection.connect();
//connection.query(sql,function (err, result) {})
//connection.end();

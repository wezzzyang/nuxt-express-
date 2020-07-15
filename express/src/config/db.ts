const mysql:any = require('mysql');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ctdms'
});

let db:any = {
  query: function (sql:string, callback:any) {
    pool.getConnection(function (err:any, connection:any) {
        if (err) {
            return callback(err);
        }
        //Use the connection
        connection.query(sql, function (err:any, results:any, fields:any) {
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

export default db;


// let connection:any = mysql.createConnection(config);

// export default connection;

//connection.connect();
//connection.query(sql,function (err, result) {})
//connection.end();
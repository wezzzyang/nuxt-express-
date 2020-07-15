import db from '../config/db'

class adminModel {
    constructor() {
    }
    
    findLogin(act:string,pwd:string,test:any) {
      let results:any = {};
      let sql = `select * from admin where account = '${act}' && password = '${pwd}'`;
       db.query(sql, function (err:any, rows:any) {
          results = rows;
          if ( err ) { 
            test({ judge: "fail" });
            return {}; 
          }
          if ( !Array.isArray(results) || results.length === 0 ) {
            test({ judge: "fail" } )
          } else {
            test({ judge: "success", user: results[0] })
          }
      });
    }
    
    updateUser(act:string,pwd:string,test:any) {
      let results:any = {};
       db.query(`UPDATE ADMIN SET PASSWORD = '${pwd}' where account = '${act}'`, function (err:any, rows:any) {
          results = rows;
          if ( err ) { 
            test({ judge: "fail" });
            return {}; 
          }
          if ( results.affectedRows === 0) {
            test({ judge: "fail" } )
          } else {
            test({ judge: "success" })
          }
      });
    }

    findAllUser(test:any) {
      let results:any = {};
       db.query(`select * from student`, function (err:any, studentRows:any) {
         db.query(`SELECT * FROM TEACHER`, function (err:any, teacherRows:any) {
            results = [...studentRows,...teacherRows];
            if ( err ) { 
              test([]);
              return {}; 
            }
            if ( results.affectedRows === 0) {
              test([])
            } else {
              test(results)
            }
        })
      });
    }
    //查找
    searchUser(keyword:string,test:any) {
      let results:any = {};
       db.query(`select * from student where account like '%${keyword}%' or name like '%${keyword}%' or department like '%${keyword}%' or major like '%${keyword}%'`, function (err:any, studentRows:any) {
         
         db.query(`SELECT * FROM TEACHER where account like '%${keyword}%' or name like '%${keyword}%' or department like '%${keyword}%'`, function (err:any, teacherRows:any) {
            results = [...studentRows,...teacherRows];
            console.log('results: ', results);
            if ( err ) { 
              test([]);
              return {}; 
            }
            if ( results.affectedRows === 0) {
              test([])
            } else {
              test(results)
            }
        })
      
      });
    }
    
}

export default adminModel;
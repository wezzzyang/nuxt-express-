import db from '../config/db'

class teacherModel {
    constructor() {
    }
    
    findLogin(act:string,pwd:string,test:any) {
      let results = {};
      let sql = `select * from teacher where account = '${act}' && password = '${pwd}'`;
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
       db.query(`UPDATE teacher SET PASSWORD = '${pwd}' where account = '${act}'`, function (err:any, rows:any) {
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
}

export default teacherModel;
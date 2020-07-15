import db from '../config/db'

class materialModel {
    constructor() {
    }
    //添加教学资料
    upload(newMaterial:any,test:any) {
      let search = this.search;
      let results:any = {};
      let sql = `INSERT INTO Material (name,saveUrl,uploader,uploadTime,size,downloadUrl) VALUES ('${newMaterial.name}','${newMaterial.saveUrl}','${newMaterial.uploader}','${newMaterial.uploadTime}','${newMaterial.size}','${newMaterial.downloadUrl}')`;
       db.query(sql, function (err:any, rows:any) {
          results = rows;
          if ( err ) { 
            test({ judge: "fail" });
            return {}; 
          }
          if (results.affectedRows === 0) {
            test({ judge: "fail" } )
          } else {
            search('',test);
          }
      });
    }
    //删除教学资料
    delete(deleteID:any,test:any) {
      let search = this.search;
      let results:any = {};
      let sql = `DELETE FROM Material WHERE id ='${deleteID}'`;
       db.query(sql, function (err:any, rows:any) {
          results = rows;
          if ( err ) { 
            test({ judge: "fail" });
            return {}; 
          }
          if (results.affectedRows === 0) {
            test({ judge: "fail" } )
          } else {
            search('',test);
          }
      });
    }
    //查找教学资料
    search(keyword:string,test:any) {
      let results:any = {};
      let sql = `select * from Material where name like '%${keyword}%' or uploader like '%${keyword}%';`;
       db.query(sql, function (err:any, rows:any) {
          results = rows;
          if ( err ) { 
            test({ judge: "fail" });
            return {}; 
          }
          if ( !Array.isArray(results) || results.length === 0 ) {
            test({ judge: "fail" } )
          } else {
            test(results);
          }
      });
    }
}

export default materialModel;
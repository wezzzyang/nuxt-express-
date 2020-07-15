import db from '../config/db'

class bookModel {
    constructor() {
    }
    //找到所有书籍
    findAllBook(test:any) {
      let results:any = {};
      let sql = `select * from book`;
       db.query(sql, function (err:any, rows:any) {
          results = rows;
          if ( err ) { 
            test([]);
            return {}; 
          }
          if ( !Array.isArray(results) || results.length === 0 ) {
            test([])
          } else {
            test(results)
          }
      });
    }
    //添加书籍
    addBook(newBook:any,test:any) {
      let findAllBook = this.findAllBook;
      let results:any = {};
      let sql = `INSERT INTO BOOK (BOOKID,BOOKNAME,AUTHOR,MAJOR,PUBLISHER,BEIZHU) VALUES ('${newBook.bookID}','${newBook.bookName}','${newBook.author}','${newBook.major}','${newBook.publisher}','${newBook.beiZhu}')`;
       db.query(sql, function (err:any, rows:any) {
          results = rows;
          if ( err ) { 
            test({ judge: "fail" });
            return {}; 
          }
          if (results.affectedRows === 0) {
            test({ judge: "fail" } )
          } else {
            findAllBook(test);
          }
      });
    }
    //删除书籍
    deleteBook(deleteID:any,test:any) {
      let findAllBook = this.findAllBook;
      let results:any = {};
      let sql = `DELETE FROM BOOK WHERE BOOKID ='${deleteID}'`;
       db.query(sql, function (err:any, rows:any) {
          results = rows;
          if ( err ) { 
            test({ judge: "fail" });
            return {}; 
          }
          if (results.affectedRows === 0) {
            test({ judge: "fail" } )
          } else {
            findAllBook(test);
          }
      });
    }
    //更新书籍
    updateBook(newBook:any,test:any) {
      let findAllBook = this.findAllBook;
      let results:any = {};
      let sql = `UPDATE BOOK SET BOOKNAME = '${newBook.bookName}', AUTHOR = '${newBook.author}', MAJOR = '${newBook.major}', PUBLISHER = '${newBook.publisher}', BEIZHU = '${newBook.beiZhu}' WHERE BOOKID = '${newBook.bookID}'`;
       db.query(sql, function (err:any, rows:any) {
          results = rows;
          if ( err ) { 
            test({ judge: "fail" });
            return {}; 
          }
          if (results.affectedRows === 0) {
            test({ judge: "fail" } )
          } else {
            findAllBook(test);
          }
      });
    }
    //查找拥有
    searchMyMajorBook(major:string,test:any) {
      let results:any = {};
      let sql = `select * from book where major = '${major}'`;
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
    //查找
    searchBook(keyword:string,test:any) {
      let results:any = {};
      let sql = `select * from book where bookName like '%${keyword}%' or author like '%${keyword}%' or publisher like '%${keyword}%' or major like '%${keyword}%' or beiZhu like '%${keyword}%' ;`;
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

export default bookModel;
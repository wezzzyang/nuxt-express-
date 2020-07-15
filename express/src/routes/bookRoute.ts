import express from 'express'
import bookModel from '../model/bookModel'

let bookmodel:any = new bookModel();
const router = express.Router();

router.get('/findAllBook', (req, res, next) => {
    bookmodel.findAllBook((data:object) => {
      res.json(data)
    });
})

router.post('/addBook', (req, res, next) => {
    bookmodel.addBook(req.body,(data:object) => {
      res.json(data)
    });
})

router.post('/deleteBook', (req, res, next) => {
    bookmodel.deleteBook(req.body.bookID,(data:object) => {
      res.json(data)
    });
})

router.post('/updateBook', (req, res, next) => {
    bookmodel.updateBook(req.body,(data:object) => {
      res.json(data)
    });
})

router.post('/searchMyMajorBook', (req, res, next) => {
    bookmodel.searchMyMajorBook(req.query.major,(data:object) => {
      res.json(data)
    });
})

router.post('/searchBook', (req, res, next) => {
    bookmodel.searchBook(req.body.keyword,(data:object) => {
      res.json(data)
    });
})

export default router;
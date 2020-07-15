"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookModel_1 = __importDefault(require("../model/bookModel"));
let bookmodel = new bookModel_1.default();
const router = express_1.default.Router();
router.get('/findAllBook', (req, res, next) => {
    bookmodel.findAllBook((data) => {
        res.json(data);
    });
});
router.post('/addBook', (req, res, next) => {
    bookmodel.addBook(req.body, (data) => {
        res.json(data);
    });
});
router.post('/deleteBook', (req, res, next) => {
    bookmodel.deleteBook(req.body.bookID, (data) => {
        res.json(data);
    });
});
router.post('/updateBook', (req, res, next) => {
    bookmodel.updateBook(req.body, (data) => {
        res.json(data);
    });
});
router.post('/searchMyMajorBook', (req, res, next) => {
    bookmodel.searchMyMajorBook(req.query.major, (data) => {
        res.json(data);
    });
});
router.post('/searchBook', (req, res, next) => {
    bookmodel.searchBook(req.body.keyword, (data) => {
        res.json(data);
    });
});
exports.default = router;

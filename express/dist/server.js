"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const bookRoute_1 = __importDefault(require("./routes/bookRoute"));
const materialRoute_1 = __importDefault(require("./routes/materialRoute"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
app.use(cookie_parser_1.default());
app.set('json spaces', 2);
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
// 全局拦截配置CROS
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-origin', '*');
    res.header('Access-Control-Allow-Headers', 'accept, origin, X-Requested-With, content-type, token, userId');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use('/public', express.static('public'));
app.use('/api/user', userRoute_1.default);
app.use('/api/Admin', adminRoute_1.default);
app.use('/api/book', bookRoute_1.default);
app.use('/api/material', materialRoute_1.default);
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    res.json({ error: err });
});
app.use(errorHandler);
function errorHandler(err, req, res, next) {
    console.error(err);
    res.json({ error: err });
}
app.listen(8080);

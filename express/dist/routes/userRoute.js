"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminModel_1 = __importDefault(require("../model/adminModel"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const teacherModel_1 = __importDefault(require("../model/teacherModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let adminmodel = new adminModel_1.default();
let studentmodel = new studentModel_1.default();
let teachermodel = new teacherModel_1.default();
const router = express_1.default.Router();
router.post('/login', (req, res, next) => {
    let secretOrPrivateKey = "jwt"; // 这是加密的key（密钥）
    let content = { account: req.body.account };
    let token = jsonwebtoken_1.default.sign(content, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 1 // 1小时过期
    });
    switch (req.body.account.length) {
        case 4:
            adminmodel.findLogin(req.body.account, req.body.password, (data) => {
                let Data = data;
                if (data.judge == 'success') {
                    res.cookie('token', token, {
                        expires: new Date(Date.now() + 3600000),
                    });
                    Object.assign(Data.user, data.user, { type: 'Admin' });
                }
                res.json(Data);
            });
            break;
        case 6:
            teachermodel.findLogin(req.body.account, req.body.password, (data) => {
                let Data = data;
                if (data.judge == 'success') {
                    res.cookie('token', token, {
                        expires: new Date(Date.now() + 3600000),
                    });
                    Object.assign(Data.user, data.user, { type: 'Teacher' });
                }
                res.json(Data);
            });
            break;
        case 12:
            studentmodel.findLogin(req.body.account, req.body.password, (data) => {
                let Data = data;
                if (data.judge == 'success') {
                    res.cookie('token', token, {
                        expires: new Date(Date.now() + 3600000),
                    });
                    Object.assign(Data.user, data.user, { type: 'Student' });
                }
                res.json(Data);
            });
            break;
        default:
            res.json({ judge: "fail" });
            break;
    }
});
router.put('/ChangePwd', (req, res, next) => {
    switch (req.body.account.length) {
        case 4:
            adminmodel.updateUser(req.body.account, req.body.password, (data) => {
                res.json(data);
            });
            break;
        case 6:
            teachermodel.updateUser(req.body.account, req.body.password, (data) => {
                res.json(data);
            });
            break;
        case 12:
            studentmodel.updateUser(req.body.account, req.body.password, (data) => {
                res.json(data);
            });
            break;
        default:
            res.json({ judge: "fail" });
            break;
    }
});
router.get('/checkUser', (req, res, next) => {
    let token = req.get("Authorization"); // 从Authorization中获取token
    let secretOrPrivateKey = "jwt"; // 这是加密的key（密钥）
    jsonwebtoken_1.default.verify(token, secretOrPrivateKey, (err, decode) => {
        if (err) { //  时间失效的时候 || 伪造的token
            res.send({ 'status': 10010 });
        }
        else {
            res.send({ 'status': 10000 });
        }
    });
});
router.get('/quit', (req, res, next) => {
    res.clearCookie("token");
    res.send('');
});
exports.default = router;

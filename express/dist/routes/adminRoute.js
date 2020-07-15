"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminModel_1 = __importDefault(require("../model/adminModel"));
let adminmodel = new adminModel_1.default();
const router = express_1.default.Router();
router.get('/QueryAllUsers', (req, res, next) => {
    adminmodel.findAllUser((data) => {
        res.json(data);
    });
});
router.post('/searchUser', (req, res, next) => {
    console.log('req.query: ', req.body);
    adminmodel.searchUser(req.body["keyword"], (data) => {
        console.log('data: ', data);
        res.json(data);
    });
});
exports.default = router;

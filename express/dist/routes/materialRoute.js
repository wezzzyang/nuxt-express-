"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const materialModel_1 = __importDefault(require("../model/materialModel"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
let upFileGe = multer_1.default({ dest: 'tmp/' });
let materialmodel = new materialModel_1.default();
const router = express_1.default.Router();
router.post('/upload', upFileGe.any(), (req, res, next) => {
    let date = new Date();
    let das_file = `./dist/public/${Number(date)}_${req.files[0].originalname}`;
    fs_1.default.readFile(req.files[0].path, (err, data) => {
        fs_1.default.writeFile(das_file, data, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                let fileOB = {
                    name: req.files[0].originalname,
                    saveUrl: `${Number(date)}_${req.files[0].originalname}`,
                    uploader: req.body.uploader,
                    uploadTime: `${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`,
                    size: req.files[0].size,
                    downloadUrl: `http://39.107.226.9/api/material/download?name=${Number(date)}_${req.files[0].originalname}`,
                };
                materialmodel.upload(fileOB, (data) => {
                    res.json(data);
                });
            }
        });
    });
});
router.get('/download', (req, res, next) => {
    res.download(`./dist/public/${req.query.name}`);
});
router.delete('/delete', (req, res, next) => {
    materialmodel.delete(req.query.id, (data) => {
        res.json(data);
    });
});
router.get('/search', (req, res, next) => {
    materialmodel.search(req.query.key, (data) => {
        res.json(data);
    });
});
exports.default = router;

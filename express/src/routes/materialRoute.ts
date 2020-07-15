import express from 'express'
import materialModel from '../model/materialModel'
import multer from 'multer'
import fs from 'fs'

let upFileGe:any = multer({dest: 'tmp/'});
let materialmodel:any = new materialModel();
const router = express.Router();

router.post('/upload',upFileGe.any(), (req:any, res, next) => {
  
  let date = new Date();
  let das_file = `./dist/public/${Number(date)}_${req.files[0].originalname}`;

  fs.readFile(req.files[0].path, (err, data) => {
    fs.writeFile(das_file, data, function(err) {
      if( err ){
          console.log( err );
      }else{
        let fileOB:any = {
          name: req.files[0].originalname,
          saveUrl: `${Number(date)}_${req.files[0].originalname}` ,
          uploader: req.body.uploader,
          uploadTime: `${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日${date.getHours()}时${date.getMinutes()}分${date.getSeconds()}秒`,
          size: req.files[0].size,
          downloadUrl: `http://39.107.226.9/api/material/download?name=${Number(date)}_${req.files[0].originalname}`,
        };
        materialmodel.upload(fileOB,(data:object) => {
          res.json(data)
        });
      }
    })
  })
})

router.get('/download', (req, res, next) => {
  res.download(`./dist/public/${req.query.name}`)
})

router.delete('/delete', (req, res, next) => {
  materialmodel.delete(req.query.id,(data:object) => {
    res.json(data)
  });
})

router.get('/search', (req, res, next) => {
  materialmodel.search(req.query.key,(data:object) => {
    res.json(data)
  });
})

export default router;
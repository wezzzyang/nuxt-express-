import express from 'express'
import adminModel from '../model/adminModel'
import studentModel from '../model/studentModel'
import teacherModel from '../model/teacherModel'
import jwt from 'jsonwebtoken'

let adminmodel:any = new adminModel();
let studentmodel:any = new studentModel();
let teachermodel:any = new teacherModel();
const router = express.Router();

router.post('/login', (req, res, next) => {

    let secretOrPrivateKey="jwt";// 这是加密的key（密钥）
    let content:any = { account: req.body.account };
    let token = jwt.sign(content , secretOrPrivateKey, {
      expiresIn: 60*60*1  // 1小时过期
    });
    
    switch (req.body.account.length) {
      case 4: adminmodel.findLogin(req.body.account,req.body.password,(data:any) => {
          let Data:any = data;

          if( data.judge == 'success' ) {
            res.cookie('token', token, {
              expires: new Date(Date.now() + 3600000),
            })
            Object.assign(Data.user,data.user,{ type:'Admin' });
          }
          res.json(Data)
        }); break;
      case 6: teachermodel.findLogin(req.body.account,req.body.password,(data:any) => {
          let Data:any = data;

          if( data.judge == 'success' ) {
            res.cookie('token', token, {
              expires: new Date(Date.now() + 3600000),
            })
            Object.assign(Data.user,data.user,{ type:'Teacher' })
          }
          res.json(Data)
        }); break;
      case 12: studentmodel.findLogin(req.body.account,req.body.password,(data:any) => {
          let Data:any = data;

          if( data.judge == 'success' ) {
            res.cookie('token', token, {
              expires: new Date(Date.now() + 3600000),
            })
            Object.assign(Data.user,data.user,{ type:'Student' })
          }
          res.json(Data)
        }); break;
    
      default:res.json({ judge: "fail" })
      break;
    }

})
router.put('/ChangePwd', (req, res, next) => {
    switch (req.body.account.length) {
      case 4: adminmodel.updateUser(req.body.account,req.body.password,(data:any) => {
        res.json(data)
      }); break;
      case 6: teachermodel.updateUser(req.body.account,req.body.password,(data:any) => {
          res.json(data)
        }); break;
      case 12: studentmodel.updateUser(req.body.account,req.body.password,(data:any) => {
          res.json(data)
        }); break;
    
      default:res.json({ judge: "fail" })
      break;
    }
})
router.post('/checkUser', (req: any, res: any, next: any) => {
    let token = req.get("Authorization"); // 从Authorization中获取token
    let secretOrPrivateKey="jwt"; // 这是加密的key（密钥）

    jwt.verify(token, secretOrPrivateKey, (err: any, decode: any)=> {
        if (err) {  //  时间失效的时候 || 伪造的token
            res.send({'status':10010});
        } else {
            res.send({'status':10000});
        }
    })
})
router.get('/quit', (req: any, res: any, next: any) => {
  res.clearCookie("token");
  res.send('');
})

export default router;
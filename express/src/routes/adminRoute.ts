import express from 'express'
import adminModel from '../model/adminModel'

let adminmodel:any = new adminModel();
const router = express.Router();

router.get('/QueryAllUsers', (req, res, next) => {
    adminmodel.findAllUser((data:any) => {
      res.json(data)
    });
})

router.post('/searchUser', (req, res, next) => {
    console.log('req.query: ', req.body);
    adminmodel.searchUser(req.body["keyword"], (data:any) => {
    console.log('data: ', data);
      res.json(data)
    });
})


export default router;
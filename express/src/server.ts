const express:any = require('express');
const app:any = express();
import userRoute from './routes/userRoute'
import adminRoute from './routes/adminRoute'
import bookRoute from './routes/bookRoute'
import materialRoute from './routes/materialRoute'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookie from 'cookie-parser';

app.use(cookie());
app.set('json spaces', 2)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/public', express.static('public'))
// 全局拦截配置CROS
app.all('*',function(req:any,res:any,next:any){
	res.header('Access-Control-Allow-origin','*')
	res.header('Access-Control-Allow-Headers','accept, origin, X-Requested-With, content-type, token, userId')
	res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS')
	res.header('Content-Type','application/json;charset=utf-8')
	res.header('Access-Control-Allow-Credentials','true')
	next()
})

app.use('/public', express.static('public'));
app.use('/api/user', userRoute);
app.use('/api/Admin', adminRoute);
app.use('/api/book', bookRoute);
app.use('/api/material', materialRoute);


app.use(function(req:any, res:any, next:any) {
  let err:any = new Error('Not Found')
  err.status = 404
  res.json({error:err})
})

app.use(errorHandler);
function errorHandler(err:any, req:any, res:any, next:any) {
	console.error(err)
	res.json({error: err})
}

app.listen(8080)
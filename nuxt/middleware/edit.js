import axios from 'axios'
import getCookie from '~/uitls/getCookie'

export default async function ({ app , req , redirect , route }){
  
  let token ;
  if(req) { //req只有在服务端会触发
    //当用户第一次进入页面时，会先触发服务端，继续访问其他页面，触发客户端
    //F5刷新后，相当于第一次进入页面，触发服务端
    //客户端req:undefined
    token = getCookie.getcookiesInServer(req).token;
    //从服务端获取cookie
  } else {
    token = getCookie.getcookiesInClient('token')
    //从客户端获取cookie
  }
  if(!token) {
      redirect({ path: '/user/login' });
      //服务端进行重定向时， 会导致window、sessionStorage这些 全局变量无法使用
      //需要使用process.client 判断是否是客户端
      //如果在客户端（浏览器），进行重定向则无需
  } else {
    axios.interceptors.request.use(
    config => {
        config.headers.authorization = token  //请求头加上token
        return config
    },
    err => { return Promise.reject(err) })
  }

  let middata = await axios.get('http://39.107.226.9/api/user/checkUser');
  if(middata.data.status !== 10000) {
    redirect({ path: '/user/login' });
  }
}





<template>
   <el-form
        :model="loginData"
        status-icon
        :rules="rules"
        ref="loginData"
        class="demo-ruleForm">
        <el-form-item prop="account">
            <el-input
                placeholder="请输入用户名" v-model="loginData.account" autocomplete="off">
                <template slot="prepend">
                    <li class="el-icon-user-solid"></li>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item prop="password">
            <el-input
                type="password"
                placeholder="请输入密码" v-model="loginData.password"
                autocomplete="off">
                <template slot="prepend">
                    <li class="el-icon-lock"></li>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item>
            <el-button
                type="success"
                class="loginButton"
                @click="submitForm('loginData')">
                登陆
            </el-button>
        </el-form-item>

   </el-form>
</template>

<script>

import { mapActions, mapMutations } from 'vuex'
import qs from 'qs'

export default {
    layout: 'userLy',
    data() { //设置数据用的
        return {
            checked: false,
            loginData: {
                account: '0001',
                password: 'admin'
            },//  loginData: {
            //     account: '0001',
            //     password: '123456'
            // },
            rules: {
                account: [
                    {
                        required: true, //必填，不填就不会发送请求
                        message:'账号不能为空',
                        trigger: 'blur',//当你鼠标，焦点消失的时候
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }
                ]
            }

        }
    },
    created() {
    },
    methods: {
        ...mapActions({
            loginAxios: 'login/loginAxios'
        }),
        // ...mapMutations({
        //   userMessage: 'login/userMessage'
        // }),

         submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {//判断是否符合规范

                    try {
                        let midata = await this.loginAxios(this.loginData);//加this
                        let testLogin = midata.data

                        //解析后端传来的字符串
                        //{judge:'success',user:{"type":"Admin","account":"0001","name":"管理员","department":"人工智能"}}
                        if(testLogin.judge == "success") { //data {judge:"success/fail",user:{message}}

                            process.client ? sessionStorage.setItem("user",JSON.stringify(testLogin.user)) : "";
                            //JSON.stringify()
                            //this.userMessage(testLogin);

                            this.$router.push({
                                path: '/admin'
                            });
                            // '/admin'
                            //{
                            //     path: '/admin'
                            // }
                        } else {
                          alert("输入账号密码错误!");
                        }

                    } catch(e) {
                        console.log('e: ', e);
                        alert('输入账号密码出错,请稍后重新输入!');
                    }

                } else {
                    return false;
                }

            });
        },
    }
}
</script>

<style scoped>
    .loginButton {
        background-color: #00c58e;
        width: 100%;
        font-size: 17px;
        letter-spacing: 10px;
    }
    .linkNuxt {
        text-decoration: none;
        color: #029789;
        font-size: 17px;
    }
</style>

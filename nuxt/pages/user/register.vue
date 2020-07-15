<template>
   <el-form
        :model="registerData"
        status-icon
        :rules="rules"
        ref="registerData"
        class="demo-ruleForm">
        <el-form-item prop="account">
            <el-input
                placeholder="请输入用户名" v-model="registerData.account" autocomplete="off">
                <template slot="prepend">
                    <li class="el-icon-user-solid"></li>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item prop="password">
            <el-input
                type="password"
                placeholder="请输入密码" v-model="registerData.password"
                autocomplete="off">
                <template slot="prepend">
                    <li class="el-icon-lock"></li>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item prop="passwordAgain">
            <el-input
                type="password"
                placeholder="请再次输入密码" v-model="registerData.passwordAgain"
                autocomplete="off">
                <template slot="prepend">
                    <li class="el-icon-lock"></li>
                </template>
            </el-input>
        </el-form-item>

        <el-form-item>
            <el-button
                type="success"
                class="registerButton"
                @click="submitForm('registerData')">
                注册
            </el-button>
        </el-form-item>
   </el-form>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
    layout: 'userLy',
    middleware: 'edit',
    data() {
        var validatePass = (rule, value, callback) => {
            if(value !== this.registerData.password) {
                callback(new Error('两次密码不一样,请重新输入'));
            } else {
                 callback();
            }
        };
        return {
            checked: false,
            registerData: {
                account: '',
                password: '',
                passwordAgain:'',
            },
            rules: {
                account: [
                    {
                        required: true,
                        message:'账号不能为空',
                        trigger: 'blur'
                    }, {
                        max:11,
                        min:5,
                        message:'账号格式错误',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }, {
                        max:12,
                        min:5,
                        message:'密码格式错误',
                        trigger: 'blur'
                    }
                ],
                passwordAgain: [{
                        validator: validatePass,
                        trigger: 'blur'
                    },
                    {
                        required: true,
                        message: '密码不能为空',
                        trigger: 'blur'
                    }, {
                        max:12,
                        min:5,
                        message:'密码格式错误',
                        trigger: 'blur'
                    }
                ]
            }

        }
    },
    methods: {
        ...mapActions({
            registerAxios: 'register/registerAxios'
        }),
         submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    try {
                        let testregister = await this.registerAxios(this.registerData);
                        if(testregister.data){
                            alert('用户已经被注册，请重新输入');
                            return '';
                        }
                        this.$router.push({
                            path: '/admin'
                        })
                    } catch(e) {
                        alert(e);
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
    .registerButton {
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

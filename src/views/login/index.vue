<template>
    <div class="login-container">
        <el-form class="login-form" ref="form" :model="form" :rules="loginRules" label-position="left" label-width="90px" :show-message="false">

            <div class="title-container">
                <h3 class="title">{{$t('login.title')}}</h3>
                <!--                <lang-select class="set-language"></lang-select>-->
            </div>

            <el-form-item :label="$t('login.username')" prop="username" >
                <!--<span class="svg-container svg-container_login">
                    <svg-icon icon-class="user" />
                </span>-->
                <el-input name="username" type="text" v-model="form.username" :placeholder="$t('login.username_placeholder')" />
            </el-form-item>

            <el-form-item :label="$t('login.password')" prop="password">
                <!--<span class="svg-container">
                    <svg-icon icon-class="password" />
                </span>-->
                <el-input name="password" type="password" @keyup.enter.native="onSubmit" v-model="form.password" :placeholder="$t('login.password_placeholder')" />
            </el-form-item>

            <el-button type="primary" @click="onSubmit" style="width: 90%">{{$t('login.logIn')}}</el-button>

        </el-form>
    </div>
</template>
<script>
    //import { loginByUsername } from '@/api/login'
    import axios from 'axios'
    import router from "@/router"
    import { Message } from 'element-ui';
    export default {
        data(){
            const validateUsername = (rule, value, callback) => {
                if(value === ""){
                    this.$message({
                        message: this.$t('login.username_error1'),
                        type: 'error'
                    })
                    callback(new Error())
                }
                else if (value.length < 5 || value.length > 25) {
                    this.$message({
                        message: this.$t('login.username_error2'),
                        type: 'error'
                    })
                    callback(new Error())
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if(value === ""){
                    this.$message({
                        message: this.$t('login.password_error1'),
                        type: 'error'
                    })
                    callback(new Error())
                }
                else if (value.length < 5 || value.length > 25) {
                    this.$message({
                        message: this.$t('login.password_error2'),
                        type: 'error'
                    })
                    callback(new Error())
                } else {
                    callback()
                }
            }
            return {
                form: {
                    username: "",
                    password: ""
                },
                loginRules: {
                    username: [
                        {required: true,  trigger: 'blur',validator: validateUsername},
                        {min: 6, max: 25, message: '账号长度在6位到25位之间', trigger: 'blur'},
                    ],
                    password: [
                        {required: true,  trigger: 'blur',validator: validatePassword },
                        {min: 6, max: 25, message: '密码长度在6位到25位之间', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            onSubmit() {
                const login_error = this.$t('login.login_error');
                console.log(this.form.username);
                this.$refs.form.validate((valid)=>{
                    if(valid) {
                        //console.log("有效");
                        //this.$router.push({ path: 'example' });
                        const querystring = require('querystring');
                        /*loginByUsername(this.form).then(response =>{
                            console.log("success:\n");
                            if (response.error != null) {
                                this.$message({
                                    message: this.$t('login.login_error'),
                                    type: 'error'
                                })
                            } else {
                                router.push({
                                    path:'/example'
                                })
                            }
                        }).catch(function (error) {
                            console.log("error:\n");
                            console.log(error);
                        });*/
                        axios.post('/api/login', querystring.stringify({
                            username: this.form.username,
                            password: this.form.password
                        }))
                            .then(function (response) {
                                console.log("success:\n");
                                if (response.data.error != null){
                                    Message({
                                        message: login_error,
                                        type: 'error'
                                    })
                                } else {
                                    router.push({
                                        path:'/monitor'
                                    })
                                }
                            })
                            .catch(function (error) {
                                console.log("error:\n");
                                console.log(error);
                            });
                    }
                });
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    $bg:#ffffff;
    $light_gray:#eee;

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            /*height: 47px;*/
            width: 85%;
            /*input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                !*color: $light_gray;*!
                height: 47px;
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: #fff !important;
                }
            }*/
        }
        .el-form-item {
            font-family: "Microsoft YaHei";
            /*            border: 1px solid rgba(255, 255, 255, 0.1);
                        background: rgba(0, 0, 0, 0.1);
                        border-radius: 5px;
                        color: #454545;*/
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss">
    $bg:#ffffff;
    $light_gray:#eee;

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            /*height: 47px;*/
            width: 85%;
            /*input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                !*color: $light_gray;*!
                height: 47px;
                &:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: #fff !important;
                }
            }*/
        }
        .el-form-item {
            font-family: "Microsoft YaHei";
            /*            border: 1px solid rgba(255, 255, 255, 0.1);
                        background: rgba(0, 0, 0, 0.1);
                        border-radius: 5px;
                        color: #454545;*/
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
    $bg:#ffffff;
    $dark_gray:#889aa4;
    $light_gray:#eee;

    .login-container {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: $bg;
        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 520px;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }
        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            /*color: $dark_gray;*/
            vertical-align: middle;
            width: 30px;
            display: inline-block;
            &_login {
                font-size: 20px;
            }
        }
        .title-container {
            position: relative;
            .title {
                font-size: 26px;
                font-weight: 400;
                /*color: $light_gray;*/
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
            .set-language {
                color: #fff;
                position: absolute;
                top: 5px;
                right: 0px;
            }
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            /*color: $dark_gray;*/
            cursor: pointer;
            user-select: none;
        }
        .thirdparty-button {
            position: absolute;
            right: 35px;
            bottom: 28px;
        }
    }
</style>
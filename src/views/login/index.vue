<template>
    <div class="login-body">
        <video autoplay muted loop class="login-background" ref="video">
            <source src="/static/video/Untitlfged.mp4" type="video/mp4"/>
        </video>
        <div class="login-container">

            <transition name="login-from-fade">
                <el-form 
                    class="login-form" 
                    ref="form" 
                    :model="form" 
                    :rules="loginRules" 
                    label-position="left" 
                    label-width="90px" 
                    v-if="loginFormDisplay"
                    :show-message="false">
                
                    <svg-icon icon-class="full-screen" class="full-btn" @click.native="fullScreenClickHandler"></svg-icon>
                

                    <div class="title-container">
                        <h3 class="title">{{$t('login.title')}}</h3>
                    </div>

                    <el-form-item :label="$t('login.username')" prop="username" >
                        <el-input name="username" type="text" v-model="form.username" :placeholder="$t('login.username_placeholder')" />
                    </el-form-item>

                    <el-form-item :label="$t('login.password')" prop="password">
                        <el-input name="password" type="password" @keyup.enter.native="onSubmit" v-model="form.password" :placeholder="$t('login.password_placeholder')" />
                    </el-form-item>

                    <el-button type="primary" @click="onSubmit" style="width: 100%">{{$t('login.logIn')}}</el-button>

                </el-form>
            </transition>
            
        </div>
    </div>
   
</template>

<script>
    import axios from 'axios'
    import router from "@/router"
    import { Message } from 'element-ui'
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
                else if (value.length < 4 || value.length > 25) {
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
                fullScreenFlag: false,
                loginFormDisplay: false,
                form: {
                    username: "",
                    password: ""
                },
                loginRules: {
                    username: [
                        {required: true,  trigger: 'blur',validator: validateUsername},
                        {min: 5, max: 25, message: '账号长度在5位到25位之间', trigger: 'blur'},
                    ],
                    password: [
                        {required: true,  trigger: 'blur',validator: validatePassword },
                        {min: 5, max: 25, message: '密码长度在5位到25位之间', trigger: 'blur'},
                    ]
                }
            }
        },
        mounted(){
            this.$refs.video.playbackRate = 0.5;
            window.setTimeout(()=>{
                this.loginFormDisplay = true;
            }, 300)
        },
        methods: {
            fullScreenClickHandler(){
                if(this.fullScreenFlag){
					this.exitFullscreen();
				}else{
                    this.fullscreen();
                }
                this.fullScreenFlag = !this.fullScreenFlag;
            },

            fullscreen () {
				let docElm = document.documentElement;
				//W3C
				if (docElm.requestFullscreen) {
					docElm.requestFullscreen();
				}
				//FireFox
				else if (docElm.mozRequestFullScreen) {
					docElm.mozRequestFullScreen();
				}
				//Chrome等
				else if (docElm.webkitRequestFullScreen) {
					docElm.webkitRequestFullScreen();
				}
				//IE11
				else if (elem.msRequestFullscreen) {
					elem.msRequestFullscreen();
				}
			},
			exitFullscreen() {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				}
				else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
				else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				}
				else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				}
			},
        
            onSubmit() {
                const login_error = this.$t('login.login_error');
                let _this = this;
                this.$refs.form.validate((valid)=>{
                    if(valid) {
                        const querystring = require('querystring');

                        axios.post('/api/login', querystring.stringify({
                            username: this.form.username,
                            password: this.form.password
                        })).then(function (response) {
                            if (response.data.error != null){
                                Message({
                                    message: login_error,
                                    type: 'error'
                                })
                            } else {
                                _this.$store.dispatch("setUserName", _this.form.username);
                                router.push({
                                    path:'/pixi'
                                })
                            }
                        }).catch(function (error) {
                            console.log(error);
                            Message({
                                message: "提交出错！",
                                type: 'error'
                            })
                            
                        });
                    }else{
                        console.log("not valid");
                    }
                });
            },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

    .login-body{
        .login-container{
            position: absolute;
            z-index: 1;

            .el-input {
                display: inline-block;
                width: 85%;
            }
            .el-form-item {
                font-family: "Microsoft YaHei";
            }

            .full-btn{
                width: 23px;
                height: 23px;
                position: absolute;
                right: 12px;
                top: 12px;
                color: #2a2c30;
                cursor: pointer;
                &:hover{
                    color: #3b3c3f;
                }
            }
        }
        .login-background{
            position: fixed;
            right:0;
            bottom:0;
            min-width: 100%;
            min-height: 100%;
            width: auto;
            height: auto;
            z-index: -9999;
        }

        .login-from-fade-enter-active, .login-from-fade-leave-active{
            transition: transform .5s
        }

        .login-from-fade-enter, .login-from-fade-leave-active{
            transform: translate(0, -400px);
        }

        .login-from-display-fade-enter-active, .login-from-display-fade-leave-active{
            transition: transform .5s
        }

        .login-from-display-fade-enter, .login-from-display-fade-leave-active{
            transform: translate(0, 32px);
        }
    }

    .login-container {
        background-color: transparent;
        position: fixed;
        height: 100%;
        width: 100%;
        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 480px;
            padding: 35px 35px 25px 35px;
            margin: 120px auto;
            
            background: hsla(0,0%,100%,.4);
            border-radius:5px;

            .el-input__inner{
                background-color: transparent;
            }
            .el-form-item__label{
                color: #2a2c30;
            }
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
                color: #2a2c30;
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

<template>
    <div class="right-menu">
        <div class="right-menu-alarm">
            <div class="nav-icon-full-div">
                 <svg-icon icon-class="full-screen" class="nav-icon-alarm" @click.native="fullScreenClickHandler"></svg-icon>
            </div>
            <div class="nav-icon-user-div" >
                <el-dropdown placement="top" @command="handleCommand" trigger="click">
                    <div>
                        <svg-icon class="nav-icon-user" icon-class="nav-user" ></svg-icon>
                    </div>                
                    
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item command="update-pwd">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout" class="logout-system">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            
        </div>
        <div class="right-menu-date">
            <div class="right-menu-date-top">
                <span>{{ time }}</span>
            </div>
            <div class="right-menu-date-bottom">
                <span>{{ date }}&nbsp;&nbsp;{{ weekday }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import router from "@/router"
    import Cookies from 'js-cookie'

    export default {
        components:{
        },
        data(){
            return{
                fullScreenFlag: false,
                alarmCount:0,
                time: '',
                date: '',
                weekday: '',
                user: {
                    uuid: undefined,
                    username: undefined,
                    nickName: undefined
                }
            }
        },
        computed: {
            
        },
        mounted() {
            this.updateTime();
            setInterval(this.updateTime, 1000);
            this.setUser();
        },
        methods:{
            getAlarmCount() {

            },
            clickHandler(){
                this.$emit("alarmClick");
            },
            updateTime(){
                let cd = new Date();
                let weekdays=["周日","周一","周二","周三","周四","周五","周六"];
                this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
                this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getDate(), 2)+' ';
                this.weekday = weekdays[cd.getDay()];
            },
            zeroPadding(num, digit) {
                let zero = '';
                for(let i = 0; i < digit; i++) {
                    zero += '0';
                }
                return (zero + num).slice(-digit);
            },
            setUser(){
                this.user.username = this.$store.getters.username;
            },
            changePwd(){
                this.$emit("pwdClick",this.user);
            },
            logout(){
                router.replace({
                    path: '/login'
                });
                location.reload(); // 为了重新实例化vue-router对象 避免bug
            },
            handleCommand(e){
                if(e==="update-pwd"){
                    this.changePwd();
                }else if(e==="logout"){
                    this.$confirm('你确定要退出系统, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.logout()
                    })
                }
            },
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
        }
    }
</script>

<style  rel="stylesheet/scss" lang="scss" >

    .right-menu{
        height: 100%;
        display: flex;
        /*background-color: #1A2430;*/
        .right-menu-alarm{
            float: left;
            flex-shrink: 0;
            vertical-align: middle;
            padding: 5px 0;
            box-sizing: border-box;
            display: flex;
            margin: 0 20px;
        }
        
        .nav-icon-user-div{
            flex-shrink: 0;
            margin: auto 0;
        }
        .nav-icon-alarm-div{
            flex-shrink: 0;
            margin: auto 0;
        }
        .nav-icon-user-div{
            height: 30px;
            width: 30px;
        }

        .right-menu-date{
            .right-menu-date-top{
                height: 50%;
                text-align: center;
            }
            .right-menu-date-bottom{
                height: 50%;
                text-align: center;
            }
            span{
                
                line-height: 30px;
            }
        }
    }

    
    .nav-icon-user, .nav-icon-alarm{
        position: relative;
        cursor: pointer;

    }

    .right-menu-alarm .nav-icon-user-div .nav-icon-user{
        height: 30px;
        width: 30px;
    }
    .right-menu-alarm .nav-icon-alarm{
        height: 30px;
        width: 30px;
    }

    .nav-icon-full-div{
        vertical-align: middle;
        margin: auto;
        margin-right: 12px;
        .nav-icon-alarm{
            vertical-align: middle;
        }
    }
    
    .nav-icon-user-div{
        .el-dropdown{
            margin-right: 0;
        }
    }
    .logout-system{
        color: #ce1b47;
    }
</style>

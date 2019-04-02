<template>

    <div class="nav">
        <div class="left-nav" ref="leftNav">
            <!--<LOGO></LOGO> -->
            
            <span class="logo-title">{{logoTitle}}</span>
            
        </div>

        <div class="center-nav">
            <el-menu  :default-active="activeIndex" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <template v-for="(item, index) in navMenu">
                    <nav-item v-if="item.childType==='navigate'" :index="item.path" :item="item"></nav-item>

                    <el-menu-item v-else :index="item.path">{{item.meta.title}}</el-menu-item>
                </template>
                
            </el-menu>
        </div>

        <div class="right-nav" ref="rightNav">
            <right-menu @pwdClick="pwdClickHandler"></right-menu>
        </div>

        <el-dialog
            title="修改密码"
            :visible.sync="pwdVisible"
            width="30%"
            :before-close="handleClose">
            <el-form :model="formLabelAlign">
                <el-form-item label="账号">
                    <el-input v-model="formLabelAlign.name" :readonly="true"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="formLabelAlign.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="formLabelAlign.password=''">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>

</template>
<style rel="stylesheet/scss" lang="scss">
    .nav{
        display: flex;
        flex-direction: row;
        flex: 1;
        flex-basis: auto;
        height: 100%;

        .left-nav, .center-nav, .right-nav{
            flex-shrink: 0;
            margin: 0;
            padding: 0;
            vertical-align: top;
            box-sizing: border-box;
        }

        .left-nav{
            vertical-align: middle;
            margin: 0 20px;
            // width: 300px;
            .logo-title{
                font-size: 20px;
                color: #ffffff;
                font-weight: bold;
                line-height: 60px;
            }
        }
        .center-nav{
            flex-direction: column;
            flex:1;
        }
        .right-nav{
            flex: initial;
        }
    }
</style>
<script>
    import LOGO from "./Logo";
    import RightMenu from "./RightMenu"
    import NavItem from "./NavItem"
    import {mapGetters} from "vuex"

    export default {

        components: {
            LOGO,
            RightMenu,
            NavItem
        },
        data() {
            return {
                activeIndex: '1',
                logoTitle: "管理界面",
                pwdVisible: false,
                formLabelAlign:{
                    name: "",
                    region: ""
                }
            };
        },
        computed: {
            ...mapGetters([
                'permission_routers',
                'addRouters'
            ]),
            navMenu(){
//                console.log(this.addRouters.filter(item=>!item.hidden));
                return this.addRouters.filter(item=>!item.hidden)
            }
        },
        methods: {
            handleSelect(key, keyPath) {
//                console.log(key, keyPath);
            },
            pwdClickHandler(userForm){
                this.pwdVisible = true;
                this.formLabelAlign = userForm;
            },
            handleClose(){
                this.pwdVisible = false;
            }
        }
    }
</script>



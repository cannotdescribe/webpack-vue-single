<template>
    <div class="login-container">
        <el-form ref="form" :model="form" :rules="loginRules" label-width="80px">
            <el-form-item label="账号" prop="username">
                <el-input v-model="form.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                form: {
                    username: "",
                    password: ""
                },
                loginRules: {
                    username: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        {min: 6, max: 25, message: '长度在6到25之间', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 25, message: '长度在6到25之间', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            onSubmit(formName) {
                console.log(formName);
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        console.log("有效");
                    }else{
                        console.log("失效");
                    }
                });
            }
        }
    }
</script>
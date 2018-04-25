<template>
    <div>
        <el-row :gutter="20">
            <el-col >
                <monitor-menu></monitor-menu>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col >
                <show-body :devs="devs" :background="background" :width="width" :height="height"></show-body>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    import MonitorMenu from "../components/monitorMenu.vue"

    import ShowBody from "../components/showBody.vue"

    export default {
        name: "myCanvas",
        components:{
            ShowBody,
            MonitorMenu
        },
        mounted(){
            var _this = this;
            window.setTimeout(()=>{
//                _this.devs[10001].imgSrc = ""
            }, 2000)
        },
        data() {
            return{
                background: "/static/images/background.jpg",
                width: 1000,
                height: 1000,
                devs: {
                    "10001":{
//                        rotate: 45,
                        imgRotate: 45,
                        nodeX:50,
                        nodeY:50,
                        topList:{
                            "1000101":{
                                pointName: "初一",
                                value: "12",
                                unit: "℃"
                            },
                            "1000102":{
                                pointName: "初三",
                                value: "12",
                                unit: "℃"
                            },
                            "1000103":{
                                pointName: "初二",
                                value: "12",
                                unit: "℃"
                            }
                        },
                        imgSrc:"/static/images/rainbow.min.png",
                        leftList:{},
                        rightList:{},
                        bottomList:{},
                        devNameTop: "呵呵",
                        devNameRight: "",
                        devNameBottom: "",
                        devNameLeft: ""
                    },
//                    "10002":{
//                        nodeX:200,
//                        nodeY:50,
//                        topList:{
//                            "1000102":{
//                                pointName: "初二",
//                                value: "12",
//                                unit: "℃"
//                            }
//                        },
//                        leftList:{},
//                        rightList:{},
//                        bottomList:{},
//                        devNameTop: "呵呵",
//                        devNameRight: "",
//                        devNameBottom: "",
//                        devNameLeft: ""
//                    }
                }
            }
        },
//        methods: {
//
//        }
    }
</script>

<style>
</style>
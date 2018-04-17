import bar from "../views/example/bar"
import foo from "../views/example/foo"

import Router from 'vue-router'

import Layout from '../views/layout/Layout.vue'

import Vue from 'vue'

import login from "@/views/login/index.vue"

import monitor from "@/views/monitor/Monitor.vue"
import deploy from "@/views/deploy/Deploy.vue"

import history from "@/views/history/History.vue"

const _import = require('./_import_' + process.env.NODE_ENV)


//Vue在使用外接插件是，需要 Vue.use();
Vue.use(Router);

export const constantRouterMap = [
    {
        path: '',
        redirect: '/login',
        hidden: true
    },
    {
        path: '/login',
        // hidden: true,
        component: login
    }
];

export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

export const asyncRouterMap = [
    {
        path: '/monitor',
        component: Layout,
        redirect: '/monitor/index',
        meta: {
            title: "监控"
        },
        childType: "none",
        children:[
            {
                path: "",
                component: _import("monitor/Monitor"),
                hidden: true,
                children:[{
                    path: "center",
                    component: _import("monitor/childrenPage/center"),
                    hidden: true
                },{
                    path: "station",
                    component: _import("monitor/childrenPage/station"),
                    hidden: true
                },{
                    path: "room",
                    component: _import("monitor/childrenPage/room"),
                    hidden: true
                },{
                    path: "device",
                    component: _import("monitor/childrenPage/device"),
                    hidden: true
                },{
                    path: "code",
                    component: _import("monitor/childrenPage/code"),
                    hidden: true
                }]
            }
        ]
    },

    {
        path: '/video',
        component: Layout,
        redirect: '/video/realtime',
        childType: "navigate",
        meta: {
            title: "视频"
        },
        children: [
            {
                path: "realtime",
                component: _import("video/Video"),
                redirect: '/video/realtime/index',
                meta: {
                    title: "实时视频"
                },
                children:[{
                    path: "index",
                    hidden: true,
                    component: _import("video/realtime/index"),
                }]
            },
            {
                path: "history",
                component: _import("video/Video"),
                redirect: '/video/history/index',
                meta: {
                    title: "历史视频"
                },
                children:[{
                    path: "index",
                    hidden: true,
                    component: _import("video/history/index"),
                }]
            },
        ]
    },

    {
        path: '/deploy',
        component: Layout,
        redirect: '/deploy/userConfig',
        childType: "none",
        meta: {
            title: "配置"
        },
        children: [
            {
                path: "userConfig",
                component: deploy,
                meta: {
                    title: "用户"
                },
                redirect: '/deploy/userConfig/user',
                children:[
                    {
                        path: "user",
                        component: _import("deploy/userConfig/user"),
                        meta: {
                            title: "用户管理"
                        }
                    },
                    {
                        path: "role",
                        component: _import("deploy/userConfig/role"),
                        meta: {
                            title: "权限管理"
                        }
                    }
                ]
            },
            {
                path: "devConfig",
                component: deploy,
                meta: {
                    title: "设备"
                },
                redirect: '/deploy/devConfig/device',
                children:[
                    {
                        path: "device",
                        component: _import("deploy/devConfig/device"),
                        meta: {
                            title: "设备管理"
                        }
                    },
                    {
                        path: "code",
                        component: _import("deploy/devConfig/code"),
                        meta: {
                            title: "点位管理"
                        }
                    }
                ]
            }
        ]
    },

    {
        path: '/history',
        component: Layout,
        redirect: '/history/alarmHistory',
        childType: "none",
        meta: {
            title: "历史"
        },
        children: [
            {
                path: "alarmHistory",
                component: history,
                meta: {
                    title: "告警历史"
                },
                redirect: '/history/alarmHistory/index',
                children:[
                    {
                        path: "index",
                        component: _import("history/alarmHistory/alarmHistory"),
                        meta: {
                            title: "告警历史查询"
                        }
                    }
                ]
            },
            {
                path: "historyData",
                component: history,
                meta: {
                    title: "历史数据"
                },
                redirect: '/history/historyData/index',
                children:[
                    {
                        path: "index",
                        component: _import("history/historyData/historyData"),
                        meta: {
                            title: "历史数据查询"
                        }
                    }
                ]
            }
        ]
    },
    // {
    //     path: '/example',
    //     component: Layout,
    //     redirect: '/example/bar',
    //     meta: {
    //         title: "example"
    //     },
    //     children: [
    //         {
    //             //子路径不需要'/' 真是叫人匪夷所思
    //             path: "bar",
    //             component: bar,
    //             // hidden: true,
    //             meta: {
    //                 title: "bar"
    //             },
    //         },
    //         {
    //             path: "foo",
    //             component: foo,
    //             // hidden: true,
    //             meta: {
    //                 title: "foo"
    //             },
    //         },
    //     ]
    // }
]
import bar from "../views/example/bar"
import foo from "../views/example/foo"

import Router from 'vue-router'

import Layout from '../views/layout/Layout.vue'

import Vue from 'vue'

import login from "@/views/login/index.vue"

import monitor from "@/views/monitor/Monitor.vue"
import deploy from "@/views/deploy/Deploy.vue"


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
        children: [
            {
                path: "index",
                component: monitor,
                meta: {
                    title: "实时视频"
                },
            },
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
                //子路径不需要'/' 真是叫人匪夷所思
                path: "realtime",
                component: bar,
                // hidden: true,
                meta: {
                    title: "实时视频"
                },
            },
            {
                path: "role",
                component: foo,
                // hidden: true,
                meta: {
                    title: "历史视频"
                },
            },
        ]
    },

    {
        path: '/deploy',
        component: Layout,
        redirect: '/deploy/index',
        meta: {
            title: "配置"
        },
        children: [
            {
                //子路径不需要'/' 真是叫人匪夷所思
                path: "index",
                component: bar,
                hidden: true,
                meta: {
                    title: "index"
                }
            },
            {
                //子路径不需要'/' 真是叫人匪夷所思
                path: "user",
                component: bar,
                meta: {
                    title: "用户管理"
                }
            },
            {
                //子路径不需要'/' 真是叫人匪夷所思
                path: "role",
                component: bar,
                meta: {
                    title: "权限管理"
                }
            },
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
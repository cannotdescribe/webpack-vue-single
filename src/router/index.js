import bar from "../views/example/bar"
import foo from "../views/example/foo"

import Router from 'vue-router'

import Layout from '../views/layout/Layout.vue'

import Vue from 'vue'

import login from "@/views/login/index.vue"
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
        path: '/example',
        component: Layout,
        redirect: '/example/bar',
        meta: {
            title: "example"
        },
        children: [
            {
                //子路径不需要'/' 真是叫人匪夷所思
                path: "bar",
                component: bar,
                hidden: true,
                meta: {
                    title: "bar"
                },
            },
            {
                path: "foo",
                component: foo,
                hidden: true,
                meta: {
                    title: "foo"
                },
            },
        ]
    }
]
import bar from "../views/example/bar"
import foo from "../views/example/foo"
import main from "../views/example/main"

import Router from 'vue-router'

import Layout from '../views/layout/Layout.vue'

import Vue from 'vue'
//Vue在使用外接插件是，需要 Vue.use();
Vue.use(Router);

// console.log(Bar)
// console.log(Foo)


export const fruit = [
    {
        path: '',
        component: Layout,
        redirect: '/example',
        hidden: true
    },
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
];
export default new Router({
    // scrollBehavior: () => ({ y: 0 }),
    routes: fruit
})
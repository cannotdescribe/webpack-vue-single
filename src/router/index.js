import bar from "../views/example/bar"
import foo from "../views/example/foo"
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
    },
    {
        path: '/example',
        component: Layout,
        redirect: '/example/bar',
        children: [
            {
                path: "/bar",
                component: bar,
                hidden: true
            },
            {
                path: "/foo",
                component: foo,
                hidden: true
            },
        ]
    }
];
export default new Router({
    // scrollBehavior: () => ({ y: 0 }),
    routes: fruit
})
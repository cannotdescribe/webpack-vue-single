import Apple from "../fruit/apple.vue"
import Pear from "../fruit/pear.vue"
import Router from 'vue-router'

import Layout from '../views/layout/Layout.vue'


export const fruit = [
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [
            {
                path: "/apple",
                component: Apple,
                hidden: true
            },
            {
                path: "/pear",
                component: Pear,
                hidden: true
            },
        ]
    },
];
export default new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: fruit
})
// import fruit from "../router"
import Vue from "vue"

import 'normalize.css/normalize.css'

import router from "./router"
import App from './App'
import store from './store'
import Element from 'element-ui'

import i18n from './lang'

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import './permission'

Vue.use(Element, {
    size: 'medium' // set element-ui default size
});

new Vue({
    el: '#app',
    router,
    store,
    i18n,
    template: '<App/>',
    components:{
        App
    }
});

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
import './mock'
import './icons'

Vue.use(Element, {
    size: 'medium' ,// set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
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

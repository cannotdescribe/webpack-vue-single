// import fruit from "../router"
import Vue from "vue"

import 'normalize.css/normalize.css'

import router from "./router"
import App from './App'
import store from './store'
import Element from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

Vue.use(Element, {
    size: 'medium' // set element-ui default size
});

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components:{
        App
    }
});

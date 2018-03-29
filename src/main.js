// import fruit from "../router"

import router from "./router"
import App from './App'
import Vue from "vue"
import Element from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

Vue.use(Element, {
    size: 'medium' // set element-ui default size
});

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components:{
        App
    }
});


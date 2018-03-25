// import fruit from "../router"

import router from "./router"
// import App from "./App.vue"
import App from './App.vue'
import Vue from "vue"

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
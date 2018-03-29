<template>
    <div id="bar">
        <div >bar</div>
    </div>
</template>
<script>
    import Vue from "vue";
    import Vuex from "vuex";

    Vue.use(Vuex);

    const store = new Vuex.Store({
        state: {
            count: 0
        },
        mutations: {
            increment (state) {
                state.count++
            }
        }
    })

    const Counter = {
        template: `<div>{{ count }}</div>`,
        computed: {
            count () {
                return store.state.count
            }
        }
    };

//    const app = new Vue({
//        el: '#bar',
//    })

    export default{
        name: 'Bar',
        store,
        components: { Counter },
        template: `
            <div class="app">
              <counter></counter>
            </div>
          `
    }
</script>
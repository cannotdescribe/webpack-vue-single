import Vue from 'vue'
import Vuex from 'vuex'
import permission from './modules/permission'
import app from "./modules/app"
import user from "./modules/user"
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
      permission,
      app,
      user
  },
  getters
});

export default store

import { asyncRouterMap, constantRouterMap } from '@/router'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
      SET_ROUTERS: (state, routers) => {
          state.addRouters = routers
          state.routers = constantRouterMap.concat(routers)
      }
  },
  actions: {
      GenerateRoutes({ commit }, data) {
          return new Promise(resolve => {
              console.log(asyncRouterMap);
              commit('SET_ROUTERS', asyncRouterMap)
              resolve()
          });
      }
  }
};

export default permission

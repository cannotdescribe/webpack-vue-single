import router from './router'
import store from './store'

router.beforeEach((to, form, next)=>{
    console.log("beforeEach");
    store.dispatch("GenerateRoutes").then(()=>{
        router.addRoutes(store.getters.addRouters);
        next();
    }).catch(()=>{
        next();
    })
});
import router from './router'
import store from './store'

router.beforeEach((to, form, next)=>{
    console.log("beforeEach");
    if (store.getters.addRouters.length === 0) {
        store.dispatch("GenerateRoutes").then(()=>{
            console.log(store.getters.addRouters);
            router.addRoutes(store.getters.addRouters);
            next()
        }).catch(()=>{
            next();
        })
    }else{
        next();
    }
});
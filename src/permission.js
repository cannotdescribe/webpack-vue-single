import router from './router'
import store from './store'

router.beforeEach((to, form, next)=>{
    if (store.getters.addRouters.length === 0) {
        store.dispatch("GenerateRoutes").then(()=>{
            router.addRoutes(store.getters.addRouters);
            next({ ...to, replace: true })
        }).catch(()=>{
            next({ path: '/login' });
        })
    }else{
        next();
    }
});
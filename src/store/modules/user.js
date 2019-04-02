const app={
    state : {
        user: {
            username: ""
        }
    },
    getter:{
        username(state){
            return state.user.username;
        }
    },
    mutations: {
        setUserName: (state, username) =>{
            state.user.username = username
        }
    },
    actions: {
        setUserName: (context, username)=>{
            context.commit("setUserName", username);
        },
    }
};
export default app;
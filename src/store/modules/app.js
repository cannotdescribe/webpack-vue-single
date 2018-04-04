import Cookies from 'js-cookie'
const app={
    state : {
        sidebar: {
            opened: Cookies.get("sidebarStatus")
        }
    },
    getter:{
        sidebar(state){
            return state.sidebar;
        }
    },
    mutations: {
        TOGGLE_SIDEBAR: state =>{
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
        }
    },
    actions: {
        toggleSidebar(context){
            context.commit("TOGGLE_SIDEBAR");
        },
        actionDemo01(context){
            console.log("app: actionDemo01");
        }
    }
};
export default app;
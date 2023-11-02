import AuthManagerService from "@/Services/Manager/AuthManagerService"
export default {
    namespaced: true,
    state: {
        authUserToken : '',
        authUserName : '',
    },

    actions: {
        async authentication({}, credentials) {
            return AuthManagerService.authentication(credentials);
        },
    },

    getters : {
        getUserAuth (state){ 
            return state;
        },
        
        getUserAuth (state){
            return state;
        },

        isAuth (state){
            if(state.authUserToken){
                return true
            } 
            return false;
        },
    },
    mutations: {
        userAuth(state,userAuth) {

            localStorage.setItem("authUserName",userAuth?.name);
            localStorage.setItem("authUserToken",userAuth.token)

            state.authUserName = userAuth.name ;
            state.authUserToken = userAuth.token;
        }, 
    },  

}

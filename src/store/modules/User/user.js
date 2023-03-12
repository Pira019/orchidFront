import axios, * as others from 'axios';

export default {
    namespaced : true,  
    //api_url : import.meta.env.VITE_APP_API_URL,
    state :{
      User: {
       name : 'Pires',
        first_name:'',
        phone:'',
        birth_date:'',
        sex:'',
        residenceContry:'',
        citezenship:'',
        password: '',
        password_confirm :''  
     }
    },

    getters : {

        getUser (state,getters,rootState,rootGetters){
            return state.User;
        }
    },

    actions:{
      async saveUser({state,commit,rootState,rootGetters},newUser){

            const endPoint = 'register'
            commit('setUser',newUser)

         let response= axios.post(import.meta.env.VITE_APP_API_URL + endPoint,
                rootGetters['user/getUser']);

                console.log((await response).data);  

        }

        
    },

    mutations : {
       setUser(state,user){
        state.User = user;
       } 
    }
}

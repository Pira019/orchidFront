import UserService from '@/Services/UserService';
import axios, * as others from 'axios';

export default {
    namespaced : true,  
    //api_url : import.meta.env.VITE_APP_API_URL,
    state :{
      User: {
       name : '',
        first_name:'',
        phone:'',
        birth_date:'',
        sex:'',
        residence_contry:'',
        citizenship:'',
        password: '',
        password_confirm :'',
        recaptcha:''  
     }
    },

    getters : {

        getUser (state,getters,rootState,rootGetters){
            return state.User;
        },

        getEmail(state){
            return state.User.email;
        }
    },

    actions:{
      async saveUser({state,commit,rootState,rootGetters},newUser){
            const endPoint = 'register'
            commit('setUser',newUser) 
        return axios.post(import.meta.env.VITE_APP_API_URL + endPoint, rootGetters['user/getUser']);     
        },

        async authentificate({},credentials){
        return UserService.login(credentials)     
        },
        
        //requestBody (email,rechapcha)
        async forgotPassword({},requestBody){
            return UserService.forgotPassword(requestBody);    
        },

        //requestBody (email,rechapcha,token,password_confirmation,password)
        async updatePassword({commit},requestBody){
             commit('setEmail',requestBody?.email) 
            return UserService.updatePassword(requestBody);    
        },
    },

    mutations : {
       setUser(state,user){
        state.User = user;
       }, 
       setRecaptcha(state,recaptchaToken){
        state.User.recaptcha = recaptchaToken;
       },

       setEmail(state,email){
        state.User.email = email;
       } 
    }
}

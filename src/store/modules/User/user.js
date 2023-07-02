import UserService from '@/Services/UserService'; 

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
        password_confirmation :'',
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
        commit('setEmail',newUser?.email) 
       // return axios.post(import.meta.env.VITE_APP_API_URL + endPoint, rootGetters['user/getUser']);  
       return UserService.saveUser(newUser)   
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
        state.User= user;
       }, 
       setRecaptcha(state,recaptchaToken){
        state.User.recaptcha = recaptchaToken;
       },

       setEmail(state,email){
        state.User.email = email;
       },

       resetState(state){
        state.User.name = '';
        state.User.first_name = '';
        state.User.phone = '';
        state.User.birth_date = '';
        state.User.sex = '';
        state.User.residence_contry = '';
        state.User.citizenship = '';
        state.User.password = '';
        state.User.password_confirmation = '';
        state.User.recaptcha = '';
       } 
    }
}

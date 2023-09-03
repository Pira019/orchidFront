import Vuex from 'vuex'
import user from '@/store/modules/User/user'
import country from '@/store/modules/Country/country'
import contact from '@/store/modules/Contact/Contact'
import countryStep from './modules/CountryStep/CountryStep'
import tutorial from './modules/Manager/TutorialManager';
import authManager from './modules/Manager/AuthManager'

export default new Vuex.Store({ 
    modules: {
        user,
        country,
        contact,
        countryStep,
        tutorial,
        authManager
    },

    getters: {
        getState(state) {
            return state;
        }, 
    },

    state: {
        isSucceed: '',
        response : '',
        routhPath : '', 
    },
    
    mutations: {
        setIsSucceed(state,isSucceed_) {
            state.isSucceed = isSucceed_
        },

        setResponse(state,response) {
            state.response = response
        },

        setRoutePath(state,route) {
            state.routhPath = route
        },  
    },
})
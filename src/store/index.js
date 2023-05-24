import Vuex from 'vuex'
import user from '@/store/modules/User/user'
import country from '@/store/modules/Country/country'

export default new Vuex.Store({ 
    modules: {
        user,
        country

    },
    getters: {
        getState(state) {
            return state;
        }
    },
    state: {
        isSucceed: '',
        response : ''
    },
    mutations: {
        setIsSucceed(state,isSucceed_) {
            state.isSucceed = isSucceed_
        },

        setResponse(state,response) {
            state.response = response
        }

        
    },
})
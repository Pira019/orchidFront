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
            return state.isSucceed;
        }
    },
    state: {
        isSucceed: ''
    },
    mutations: {
        setIsSucceed(state,isSucceed_) {
            state.isSucceed = isSucceed_
        }
    },
})
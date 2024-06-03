import Vuex from 'vuex'
import user from '@/store/modules/User/user'
import country from '@/store/modules/Country/country'
import contact from '@/store/modules/Contact/Contact'
import countryStep from './modules/CountryStep/CountryStep'
import tutorial from './modules/Manager/TutorialManager';
import authManager from './modules/Manager/AuthManager'
import universityManager from './modules/Manager/UniversityManager'
import countryManager from './modules/Manager/CountryManager'
import universityProgramManager from './modules/Manager/UniversityProgramManager'
import settingManager from './modules/Manager/SettingManager'
import ExtraTutorialManager from './modules/Manager/ExtraTutorialManager'
import universityAdmissionManager from './modules/Manager/UniversityAdmissionManager'
import serviceManager from './modules/Manager/ServiceManager' 
import ManagerStore from './modules/Manager/ManagerStore'

export default new Vuex.Store({ 
    modules: {
        user,
        country,
        contact,
        countryStep,
        tutorial,
        authManager,
        universityManager,
        countryManager,
        universityProgramManager,
        settingManager,
        ExtraTutorialManager,
        universityAdmissionManager,
        serviceManager,
        ManagerStore
    },

    getters: {
        getState(state) {
            return state;
        }, 

        getError(state) {
            return state.isError;
        },  
    },

    state: {
        isSucceed: null,
        response : '',
        routhPath : '',
        isError : false, 
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

        setError401(state) {
            state.isError = true
        },  
    },
})
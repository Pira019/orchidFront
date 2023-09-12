import TutorialService from "@/Services/Manager/TutorialService";
 
export default {
    namespaced: true,
    state: {
        headerTitle:'', 
        steps:[],
        countryDetail : ''

    },
    getters: {
        getHeaderTitle(state) {
            return state.headerTitle;
        }, 

        getSteps(state) {
            return state.steps;
        }, 

        getCountryDetail(state) {
            return state.countryDetail;
        }, 
    },

    mutations: {
        setHeaderTitle(state,title) {
            state.headerTitle = title;
        }, 

        setSteps(state,steps) {
            state.steps = steps;
        },

        setCountryDetail(state,countryDetail) {
            state.countryDetail = countryDetail;
        },
    },  


    actions: {
      
        async getFlagUrlAndNameOfCountriesWithSteps({}) {
            return TutorialService.getFlagUrlAndNameOfCountriesWithSteps()
        },

        async getCountryStepsByCountryId_({},countryId) {
            return TutorialService.getCountryStepsByCountryId(countryId)
        },

        async saveTuto({},newTuto) {
            return TutorialService.save(newTuto)
        },

         async getByStepCountryId({},stepCountryId){
           return TutorialService.getByStepCountryId(stepCountryId);
        }    

        
    },
}
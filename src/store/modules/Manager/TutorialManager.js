import TutorialService from "@/Services/Manager/TutorialService";
 
export default {
    namespaced: true,
    state: {
        headerTitle:'', 
        steps:[],
        countryDetail : '',
        selectedTuto : {}

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

        getSelectedTuto(state) {
            return state.selectedTuto;
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

        selectTuto(state,selectedTuto) {
            state.selectedTuto = selectedTuto;
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
        
        async editTutorial({},updatedTuto) {
            return TutorialService.editTuto(updatedTuto)
        },

         async getByStepCountryId({},stepCountryId){
           return TutorialService.getByStepCountryId(stepCountryId);
        }    

        
    },
}
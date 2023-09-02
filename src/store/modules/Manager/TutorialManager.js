import TutorialService from "@/Services/Manager/TutorialService";
 
export default {
    namespaced: true,
    state: {
        headerTitle:'', 
    },
    getters: {
        getHeaderTitle(state) {
            return state.headerTitle;
        }, 
    },

    mutations: {
        setHeaderTitle(state,title) {
            state.headerTitle = title;
        }, 
    },  

    actions: {
      
        async getFlagUrlAndNameOfCountriesWithSteps({}) {
            return TutorialService.getFlagUrlAndNameOfCountriesWithSteps()
        } 
    },
}
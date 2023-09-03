import CountryStepsService from "@/Services/Manager/CountryStepsService";
export default {
    namespaced: true,
    state: {
        countrySelected:{}, 
        steps:[]
    },
    getters: {
        getCountrySelected(state) {
            return state.countrySelected;
        }, 
        getSteps(state) {
            return state.steps;
        }, 
    },

    mutations: {
        setSelectedCountry(state, country) {
            state.countrySelected = country;
        }, 

        setStepsList(state,steps){
            state.steps = steps;
        }
    },

    actions: {
        async saveSteps({},data) {            
            return CountryStepsService.saveSteps(data);
        },
        async getAllCountry({}) {
            return CountryStepsService.getCountries();
        },

        async getByCountry({},idCountry) {
            return CountryStepsService.getByCountry(idCountry);
        },

        async editStep({},updatedData) {
            return CountryStepsService.editStep(updatedData);
        },

        async deleteStep({},idContryStep) {
            return CountryStepsService.deleteStep(idContryStep);
        }
    },
}
import CountryStepsService from "@/Services/Manager/CountryStepsService";
export default {
    namespaced: true,
    state: {
        countrySelected:{}, 
    },
    getters: {
        getCountrySelected(state) {
            return state.countrySelected.country;
        }, 
    },

    mutations: {
        setSelectedCoutry(state, country) {
            state.countrySelected = country;
        }, 
    },

    actions: {
        async saveSteps({},data) {
            return CountryStepsService.saveSteps(data);
        },
    },
}
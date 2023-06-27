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
    }
}
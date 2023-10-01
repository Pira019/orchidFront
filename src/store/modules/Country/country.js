import CountryService from '@/Services/CountryService';
import axios, * as others from 'axios';
const baseUrl = import.meta.env.VITE_APP_API_URL;
export default {
    namespaced: true,
    state: {
        countries: [],
    },
    getters: {
        getCountries(state, getters, rootState, rootGetters) {
            return state.countries;
        }
    },

    actions: {
        async getCoutries({ state, commit, rootState, rootGetters }) {
            let endPoint = 'countries';
            axios.get(baseUrl + endPoint)
                .then((response) => {
                    commit('setCoutry', response.data)
                }).catch();
        },

        async getCities({},countryId) {            
            return CountryService.getCities(countryId);
        },
    },
    mutations: {
        setCoutry(state, countries) {
            state.countries = countries;
        }
    }
}
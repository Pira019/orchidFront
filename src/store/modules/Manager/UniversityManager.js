import UniversityService from "@/Services/Manager/UniversityService"

export default {
    namespaced: true,

    state: {
        universty: {},
    },

    actions: {

        async saveUniversity({ }, newUniversity) {
            return UniversityService.save(newUniversity)
        },

        async saveAddress({ }, address) {
            return UniversityService.saveAddress(address)
        },

        async universitiesByCountryId({ }, countryId) {
            return UniversityService.universitiesByCountryId(countryId)
        },

        async findUniversity({}, id) {
            return UniversityService.showById(id)
        },

        async UpdateUniversity({}, data) {
            return UniversityService.update(data)
        },

    },

    getters: {
        getUniversity(state) {
            return state.universty;
        },
    },

    mutations: {
        setUniversity(state, universty) {
            state.universty = universty;
        },
    }
}
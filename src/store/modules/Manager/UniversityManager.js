import UniversityService from "@/Services/Manager/UniversityService"

export default {
    namespaced: true,

    state: {
        universty: {},
        programs: null
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

        async UpdateUniversityAdress({}, data) { 
            return UniversityService.updateAdress(data)
        },

        async getUniversityPrograms({}, universityId) { 
            return UniversityService.getPrograms(universityId);
        },

    },

    getters: {
        getUniversity(state) {
            return state.universty;
        },

        getPrograms(state) {
            return state.programs;
        },
    },

    mutations: {
        setUniversity(state, universty) {
            state.universty = universty;
        },

        setPrograms(state, programs) {
            state.programs = programs;
        },
    }
}
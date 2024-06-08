import UniversityService from "@/Services/Manager/UniversityService" 

export default {
    namespaced: true,

    state: {
        universty: {},
        programs: [],
    },

    actions: {

        async getProgramAndAdmissionDate({},{ universityId, year })
        {  
            return UniversityService.getProgramAndAdmissionDate(universityId,year);
        },

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

        //university program

        async addUniversityProgram({}, {universityId,data}) { 
            return UniversityService.addProgram(universityId,data)
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

        addToProgramList(state,newProgram){
            state.programs.push(newProgram);
        },

        deleteProgramToList(state,idProgram){
            const index = state.programs.findIndex(program => program.id === idProgram);
            index !== -1 &&  state.programs.splice(index, 1); 
        },

        upDateProgram(state,updatedProgram){

            const updatedIndex = state.programs.findIndex(program => program.id === updatedProgram.id);
            if(updatedIndex !== -1){
                
               state.programs = [
                ...state.programs.slice(0, updatedIndex),
                updatedProgram,
                ...state.programs.slice(updatedIndex + 1),
               ]; 
            }
        }
    }
}
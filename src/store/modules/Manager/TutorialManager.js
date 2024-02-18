import TutorialService from "@/Services/Manager/TutorialService";
 
export default {
    namespaced: true,
    state: {
        headerTitle:'', 
        steps:[],
        extraTutos:[],
        selectedTutoId:null,
        countryDetail : '',
        selectedTuto : {}

    },
    getters: {
        getHeaderTitle(state) {
            return state.headerTitle;
        }, 
        selectedTutoId(state) {
            return state.selectedTutoId;
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
        
        getExtraTutos(state) {
            return state.extraTutos;
        }, 
    },

    mutations: {
        setHeaderTitle(state,title) {
            state.headerTitle = title;
        }, 
        setSelectedTutoId(state,selectedTutoId) {
            state.selectedTutoId = selectedTutoId;
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
        extraTutos(state,extraTutos) {
            state.extraTutos = extraTutos;
        },

        addExtraTuto(state,newTuto){
            state.extraTutos.push(newTuto);
        },

        deleteExtraTutoVideo(state,id){
            const index = state.extraTutos.findIndex(extraTuto => extraTuto.id === id);
            index !== -1 &&  state.extraTutos.splice(index, 1); 
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
        },
        
        async deleteTuto({},idTuto){
            return TutorialService.delete(idTuto);
         },         
         
        async addVideoTuto({},extraTuto) {
            return TutorialService.addVideoTuto(extraTuto)
        },

        async deleteVideoTuto({}, {id,videoId}) { 
            return TutorialService.deleteVideoTuto(id,videoId);
        },

        
    },
}
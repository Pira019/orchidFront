import ServiceService from "@/Services/Manager/ServiceService";
 
export default {
    namespaced: true,
    state: {
        isDataLoading:false,  
    },

    getters: {        
        isDataLoadingState(state) {
        return state.isDataLoading;
    }
    },

    mutations: {
        
        startDataLoading(state) {
            state.isDataLoading = true;
        },
        finishDataLoading(state) {
            state.isDataLoading = false;
        },
    },
    actions: { 

        async addService({}, newService) { 
            return ServiceService.store(newService);
        },

        async getServices({commit}) { 
            commit('startDataLoading');
            return ServiceService.getAll();
        },
        async findService({commit},id) { 
            commit('startDataLoading');
            return ServiceService.findService(id);
        },
    },
}
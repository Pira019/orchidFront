import ServiceService from "@/Services/Manager/ServiceService"; 

export default {
    namespaced: true,
    state: {
        isDataLoading:false,  
        isShowServiceDetailHeader:false,   
        service: null,   
        requestResponseMessage : null,
        pageTitle : null,
    },

    getters: {        
        isDataLoadingState(state) {
        return state.isDataLoading;
    },
       toggleServiceDetailHeader(state) {
        return state.isShowServiceDetailHeader;
    },
        getService(state) {
            return state.service;
        },
        getServiceYear(state) {
            return state.service?.year;
        },
        geResponseMessage(state) {
            return state.requestResponseMessage;
        },
        getPageTitle(state) {
            return state.pageTitle;
        }
    },

    mutations: {
        
        setPageTitle(state,pageTitle) {
            state.pageTitle = pageTitle;
        },
        startDataLoading(state) {
            state.isDataLoading = true;
        },
        finishDataLoading(state) {
            state.isDataLoading = false;
        },
        showServiceDetailHeader(state) {
            state.isShowServiceDetailHeader = true;
        },
        hideServiceDetailHeader(state) {
            state.isShowServiceDetailHeader = false;
            state.service = null;
            state.requestResponseMessage = null; 
        },
        responseMessage(state,message) {
            state.requestResponseMessage = message; 
        },
        resetResponseMessage(state) {
            state.requestResponseMessage = null; 
        },
        setService(state,service) {
            const { price,year,created_at,updated_at,status} = service
            const ServiceInfo = { price,year,created_at,updated_at,status}
            state.service = ServiceInfo;
        },
    },
    actions: { 

        async addService({}, newService) { 
            return ServiceService.store(newService);
        },

        //data represent serviverId,admissionDateIds
        async saveServiceAdmissionDates({}, data)
        {              
            return ServiceService.saveServiceAdmissionDates(data.serviceId,data);
        },

        async getServices({commit},pageNumber = 0) { 
            !pageNumber &&  commit('startDataLoading');
            return ServiceService.getAll(pageNumber);
        },      

        async findService({commit},id) { 
            commit('startDataLoading');
            commit('showServiceDetailHeader');
            return ServiceService.findService(id);
        },
    },
}
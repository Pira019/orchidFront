 export default {
    namespaced: true,
     
    state: { 
        isDataLoading:false,
        requestResponseMessage:null,
        pageTitle:null,
    },

    getters: {
        isDataLoading(state) {
            return state.isDataLoading;
        }, 
        requestResponse(state) {
            return state.requestResponseMessage;
        },  
        getPageTitle(state) {
            return state.pageTitle;
        },  
    }, 

    mutations:{
        startDataLoading(state) {
            state.isDataLoading = true;
        },
        finishDataLoading(state) {
            state.isDataLoading = false;
        },
         
        responseMessage(state,message) {
            state.requestResponseMessage = message; 
        },
        resetResponseMessage(state) {
            state.requestResponseMessage = null; 
            state.pageTitle = null; 
        },
        setPageTitle(state,pageTitle) {
            state.pageTitle = pageTitle; 
        },
    }
}
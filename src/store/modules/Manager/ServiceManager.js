import ServiceService from "@/Services/Manager/ServiceService";
 
export default {
    namespaced: true,
    
    actions: { 

        async addService({}, newService) { 
            return ServiceService.store(newService);
        },
    },
}
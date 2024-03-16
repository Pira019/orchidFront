import UniversityAdmissionService from "@/Services/Manager/UniversityAdmissionService";
 
export default {
    namespaced: true,
    
    actions: { 

        async addAdmission({}, newAdmision) { 
            return UniversityAdmissionService.addAdmssion(newAdmision);
        },
    },
}
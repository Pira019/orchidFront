import ExtraTutorialService from "@/Services/Manager/ExtraTutorialService";
 
export default {
    namespaced: true, 
    actions: { 

        async deleteVideoTuto({}, {id,token}) {  
            return ExtraTutorialService.deleteVideoTuto(id,token);
        },

        
    },
}
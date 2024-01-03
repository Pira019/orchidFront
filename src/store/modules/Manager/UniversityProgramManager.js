import UniversityProgramService from "@/Services/Manager/UniversityProgramService";
 
export default {
    namespaced: true,
    
    actions: {
      
        async getPrefilData({}) {
            return UniversityProgramService.prefilForm();
        },

        async deleteUniversityProgram({}, idUniversityProgram) { 
            return UniversityProgramService.delete(idUniversityProgram);
        },
    },
}
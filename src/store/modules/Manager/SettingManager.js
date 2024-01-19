import SettingService from "@/Services/Manager/SettingService"; 
export default {
    namespaced: true,
    
    actions: {
      
        async getWatermark({}) {
            return  SettingService.getWatermark();
        }, 
    },
}
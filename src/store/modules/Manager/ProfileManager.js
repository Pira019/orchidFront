import ProfileManagerService from "@/Services/Manager/ProfileManagerService"

 
export default {
    namespaced: true,
    
    actions: {
      
        async userProfile({}) {
            return ProfileManagerService.userProfile();
        }, 
    },
}
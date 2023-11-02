export function navigateToRoute(codeStatus,routeName){
 

    if(codeStatus == 401){
        this.$store.commit('setError401');      
        this.$router.push({name:"managerLogin" })
    
    }else if(codeStatus == 403){
        this.$store.commit('setError401');  
        this.$router.push({name:'manager403' })
    } 
 
}
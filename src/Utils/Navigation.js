export function navigateToRoute(codeStatus,routeName){
    if(codeStatus == 403){
        localStorage.removeItem("authUserToken");
        this.$router.push({name:routeName })
    }

    if(codeStatus == 401){
        this.$store.commit('setError401');      
        this.$router.push({name:"managerLogin" })
    }
}
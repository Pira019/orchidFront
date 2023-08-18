export function navigateToRoute(codeStatus,routeName){
    if(codeStatus == 403){
        this.$router.push({name:routeName })
    }

    if(codeStatus == 401){
        this.$router.push({name:"managerLogin" })
    }
}
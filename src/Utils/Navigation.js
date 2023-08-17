export function navigateToRoute(codeStatus,routeName){
    if(codeStatus == 403){
        this.$router.push({name:routeName })
    }
}
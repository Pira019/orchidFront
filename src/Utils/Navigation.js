import router from "@/router";
import store from "@/store";

const error403 = import.meta.env.VITE_ROUTE403;
const errorLogin = import.meta.env.VITE_ROUTELOGIN;
// Errors
const errors = {
    401: errorLogin,
    403: error403, 
};


export function navigateToRoute(codeStatus)
{ 
    if (errors[codeStatus]) {
        store.commit('setError401');
        // Assuming this function is called within a Vue component, you can use this.$router
        return router.push({ name: errors[codeStatus] });
    }
 
}

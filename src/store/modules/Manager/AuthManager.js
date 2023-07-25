import AuthManagerService from "@/Services/Manager/AuthManagerService"
export default {
    namespaced: true,
    state: {},

    actions: {
        async authentication({}, credentials) {
            return AuthManagerService.authentication(credentials);
        },
    },

}

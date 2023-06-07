import ContactService from "@/Services/ContactService"

export default {
    namespaced: true,
    state: {},
    getters: {},

    actions: {
        async question({}, questionFormData) {
            return ContactService.question(questionFormData)
        },
    },
}
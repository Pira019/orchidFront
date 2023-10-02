import UniversityService from "@/Services/Manager/UniversityService"

export default {
    namespaced: true,

    actions: {

        async saveUniversity({ }, newUniversity) {
            return UniversityService.save(newUniversity)
        },

    },
}
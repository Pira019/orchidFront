import CountryService from "@/Services/Manager/CountryService";

export default {
    namespaced: true, 

    actions: {
        async countriesWithUniversities({}) {
            return CountryService.countriesWithUniversities();
        },
    }, 

}

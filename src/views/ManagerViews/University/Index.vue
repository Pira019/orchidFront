<template>
    <div class="container-fluid">
        <section>
            <header class="text-center mb-3">
                <div class="mb-5">
                    <h1 class="text-success">Université</h1>
                    <router-link :to="{ name: 'ManagerUniversiteAdd' }" class="btn btn-success"> <font-awesome-icon
                            icon="fa-plus" size="1x" />Ajouter </router-link>
                </div>
                <div class="input-group">
                    <select class="form-select" id="inputGroupSelect04" v-model.number="selectedCountry">
                        <option selected disabled value="">Choisir un pays...</option>
                        <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}</option>
                    </select>
                    <div class="input-group-append">
                        <button class="btn btn-success" type="button"><font-awesome-icon icon="fa-magnifying-glass"
                                size="1x" /></button>
                    </div>
                </div>
            </header>

            <body class="m-5">
                <router-view class="border rounded container-fluid"></router-view>
            </body>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            countries: [],
            selectedCountry :''
        }
    },
    methods: {

    },
    mounted() {
        this.$store.dispatch('countryManager/countriesWithUniversities').then((response)=>{
            this.countries = response.data;
        });
    },

}
</script>
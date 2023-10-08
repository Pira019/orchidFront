<template>
    <div class="container-fluid">
        <error-modal-component v-if="unexpectedError"></error-modal-component>
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
                        <option selected disabled value="" v-if="!countries.length">Aucune université dans le systeme...
                        </option>
                        <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}
                        </option>
                    </select>
                    <div class="input-group-append">
                        <button class="btn btn-success" @click="getUniversities" type="button"><font-awesome-icon
                                icon="fa-magnifying-glass" size="1x" /></button>
                    </div>
                </div>
            </header>

            <body class="m-5">
                <router-view class="border rounded container-fluid" :data="univestities"> 
                </router-view> 
            </body>
        </section>
    </div>
</template>
<script>
import ErrorModalComponent from '@/components/modal/ErrorModalComponent.vue';
import { navigateToRoute } from '@/Utils/Navigation';
export default {
    components: { ErrorModalComponent },
    data() {
        return {
            countries: [],
            selectedCountry: '',
            unexpectedError: false,
            univestities: [],
        }
    },
    methods: {
        getUniversities() {
            this.$store.dispatch('universityManager/universitiesByCountryId', this.selectedCountry).then((response) => {
                this.univestities = response.data;
            }).catch((error) => {
                navigateToRoute.call(this, error.response.status, 'manager403');
                this.unexpectedError = false;
            });
            this.$router.push({ name: 'ManagerUniversiteList' });
        }
    },
    mounted() {
        this.$store.dispatch('countryManager/countriesWithUniversities').then((response) => {
            this.countries = response.data;
        }).catch((error) => {
            navigateToRoute.call(this, error.response.status, 'manager403');
            this.unexpectedError = false;
        });
    },

}
</script>
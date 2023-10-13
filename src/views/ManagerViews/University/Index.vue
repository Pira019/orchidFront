<template>
    <div class="container-fluid">
        <error-modal-component v-if="unexpectedError"></error-modal-component>  
            <university-layout :isShowBtn="true"> 
                <div class="input-group" id="search">
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
                 
                <!--Start list university-->

                <div class="mt-5"> 
                   <Spinner v-if="isLoading"/>
                   <card-component v-if="!isLoading" :routeName="'ManagerUniversiteDetail'" :list="univestities" :onlyHeader="true" :isUniversityList="true">
                        <span>Ville : </span>
                    </card-component>
                </div> 
                <!--End list university--> 
            
        </university-layout>
    </div>
</template>
<script>
import ErrorModalComponent from '@/components/modal/ErrorModalComponent.vue';
import { navigateToRoute } from '@/Utils/Navigation'; 
import UniversityLayout from './UniversityLayout.vue';
import Spinner from '@/components/shared/Spinner.vue';
import CardComponent from '@/components/shared/CardComponent.vue';
export default {
    components: { ErrorModalComponent, UniversityLayout,Spinner, CardComponent },
    data() {
        return {
            countries: [],
            selectedCountry: '',
            unexpectedError: false,
            univestities: [],
            isLoading : false,
        }
    },
    methods: {
        
        getUniversities() {
            this.isLoading = true;
            this.$store.dispatch('universityManager/universitiesByCountryId', this.selectedCountry).then((response) => {
                this.univestities = response.data;
                this.isLoading = false;
            }).catch((error) => {
                navigateToRoute.call(this, error.response.status, 'manager403');
                this.unexpectedError = false;
                this.isLoading = false;
            }); 
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
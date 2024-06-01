<template>
    <div class="container-fluid">
        <form  v-on:submit.prevent="getUniversities">
        <div class="input-group" id="search">
            <select required class="form-select" id="inputGroupSelect04" v-model.number="selectedCountry">
                <option selected disabled value="">Selectionnez un pays...</option>
                <option disabled value="" v-if="!countries.length">Aucune université dans le systeme...
                </option>
                <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}
                </option>
            </select>
            <div class="input-group-append">
                <button class="btn btn-success" type="submit"><font-awesome-icon
                        icon="fa-magnifying-glass" size="1x" /></button>
            </div>
        </div>
       
        </form>
        <!--Start list university-->

        <div class="mt-4">
            <Spinner v-if="isLoading" />
            <request-alert :isSucceed="false" :responseMessage="requestMessageError" v-show="!isLoading && requestMessageError"></request-alert>
            <card-component v-if="!isLoading && !requestMessageError" :routeName="'ManagerUniversiteDetail'" :list="univestities"
                :onlyHeader="true" :isUniversityList="true">
                <span>Ville : </span>
            </card-component>
        </div>
        <!--End list university-->
    </div>
</template>
<script>
import ErrorModalComponent from '@/components/modal/ErrorModalComponent.vue'; 
import Spinner from '@/components/shared/Spinner.vue';
import CardComponent from '@/components/shared/CardComponent.vue';
import errorMessage from '@/Utils/ErrorMessage';
import RequestAlert from '@/components/shared/Alert/RequestAlert.vue';
export default {
    components: { ErrorModalComponent, Spinner, CardComponent, RequestAlert },
    data() {
        return {
            countries: [],
            selectedCountry: '', 
            univestities: [],
            isLoading: false,
            requestMessageError: null
        }
    },
    methods: {

        getUniversities() 
        {
            this.isLoading = true;
            this.requestMessageError = null;
            this.$store.dispatch('universityManager/universitiesByCountryId', this.selectedCountry).then((response) => {
                this.univestities = response.data;
                this.isLoading = false;
            }).catch((error) =>
            {
               this.requestMessageError = errorMessage(error);
            }).finally(()=>
            {                
                this.isLoading = false;
            });
        }
    },
    mounted() 
    {
        this.isLoading = true;
        this.$store.dispatch('countryManager/countriesWithUniversities')
            .then((response) => {
                this.countries = response.data;
            }).catch((error) => {
                this.requestMessageError = errorMessage(error, true); 
            }).finally(()=>{
                this.isLoading = false;
            });
    },

}
</script>
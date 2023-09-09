<template>

    <div>     
        <error-modal-component v-if="errors?.isError">
            <h5>Erreur {{ errors?.code }} inattendue</h5>
        </error-modal-component>
        <section id="header">
            <h1 class="text-lg-subtitle-2">Liste des Pays avec Étapes de Tutoriels</h1>
            <p class="text-muted">
                Cette page répertorie les pays avec les étapes de tutoriels pour chaque pays. Utilisez cette liste pour trouver des tutoriels spécifiques à un pays
            </p>
        </section>   

        <section class="mt-5">
            <card-component :list="data" v-if="loadingData" :onlyHeader="true" :routeName="routeName"></card-component>
            <Spinner v-else></Spinner>
        </section>   
    </div>
 
</template>

<script>
import Spinner from '@/components/shared/Spinner.vue';
import CardComponent from '@/components/shared/CardComponent.vue';
import ErrorModalComponent from '@/components/modal/ErrorModalComponent.vue';
import { navigateToRoute } from '@/Utils/Navigation';
export default{
  components: { Spinner, CardComponent, ErrorModalComponent },
  data () {
    return {
        loadingData : false,
        data:'',
        routeName : "ManagerTutoCountrySteps",
        errors: {
        isError : false,
        code:'',
      }
    }
  },
  created () {
    this.$store.dispatch('tutorial/getFlagUrlAndNameOfCountriesWithSteps').then((response)=> {
        this.data = response.data
        this.loadingData = true 
    }).catch((error)=> {
        this.loadingData = false
        navigateToRoute.call(this, error.response?.status, 'manager403');
        this.errors = {
        isError: true,
        code : error?.response?.status
      }
    
    }); 
  },

}
</script>
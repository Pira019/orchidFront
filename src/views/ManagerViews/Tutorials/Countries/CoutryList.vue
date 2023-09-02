<template>
    <div>         
        <section id="header">
            <h1 class="text-lg-subtitle-2">Liste des Pays avec Étapes de Tutoriels</h1>
            <p class="text-muted">
                Cette page répertorie les pays avec les étapes de tutoriels pour chaque pays. Utilisez cette liste pour trouver des tutoriels spécifiques à un pays
            </p>
        </section>   

        <section class="mt-5">
            <card-component :list="data" v-if="loadingData" :onlyHeader="true"></card-component>
            <Spinner v-else></Spinner>
        </section>  
    </div>
</template>

<script>
import Spinner from '@/components/shared/Spinner.vue';
import CardComponent from '@/components/shared/CardComponent.vue';
export default{
  components: { Spinner, CardComponent },
  data () {
    return {
        loadingData : false,
        data:'',
        routeName : ""
    }
  },
  created () {
    this.$store.dispatch('tutorial/getFlagUrlAndNameOfCountriesWithSteps').then((response)=> {
        this.data = response.data
        this.loadingData = true 
    });
  
  },

}
</script>
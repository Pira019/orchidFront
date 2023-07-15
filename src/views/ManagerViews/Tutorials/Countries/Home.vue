<template>
  <div>
    <Spinner v-if="loading"></Spinner>
    <div v-if="!loading && !steps.length">
      <h2>Aucun pays dans la liste</h2>
    </div>  
    <CardComponent :data="steps">
      Nombre d'étapes 
    </CardComponent>
  </div>
</template>
<script> 
import Spinner from '@/components/shared/Spinner.vue'

import CardComponent from '@/components/shared/CardComponent.vue';
//list of countries 
export default {
 
  data() {
    return {
      steps: [],
      loading: false
    }
  },
  created() {
    this.loading = true;
    this.$store.dispatch('countryStep/getAllCountry').then((response) => {
      this.steps = response.data
      this.loading = false;
    });

    //set Page title
    this.$store.commit('tutorial/setHeaderTitle', 'Liste de pays avec étapes');
  },
  components: { CardComponent, Spinner },
  name: "CountriesHome"
}
</script>
<template>
  <div>
    <Spinner v-if="loading"></Spinner>
    <CardComponent :data="steps">
      Nombre d'étapes
    </CardComponent>
  </div>
</template>
<script>
import CardComponent from '@/components/shared/CardComponent.vue';
import Spinner from '@/components/shared/Spinner.vue'
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
    })
  },
  components: { CardComponent, Spinner },
  name: "CountriesHome"
}
</script>
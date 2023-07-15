<template>
  <country-steps :country-steps-list="countryData.country_steps">
    <template #countryName>
      {{ countryData.name }}
    </template>
  </country-steps>
</template>

<script>
import CountrySteps from '../AddTutoriel/CountrySteps.vue'
export default {
  data() {
    return {
      countryData: '',
    }
  },
  created() {
    let idCountry = parseInt(this.$route.params.id)
    this.$store.dispatch('countryStep/getByCountry', idCountry).then((response) => {
      this.countryData = response.data;
      //set Page title
      this.$store.commit('tutorial/setHeaderTitle', 'Etapes pour ' + this.countryData.short_name);
    });


  },
  components: { CountrySteps },

}
</script>
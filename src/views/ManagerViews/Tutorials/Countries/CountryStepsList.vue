<template>
    <country-steps :countryStepsList="countrySteps">
      <template #countryName>
        {{ countryData.name }}
      </template>
    </country-steps>
</template>

<script>
import CountrySteps from '../AddTutoriel/CountrySteps.vue'
export default{
  data () {
    return {
      countryData:'',
      countrySteps : ''
    }
  }, 
  created () {
    let idCountry = parseInt(this.$route.params.id)
    this.$store.dispatch('countryStep/getByCountry',idCountry).then((response)=>{
      this.countryData = response.data;
      this.countrySteps = response.data.country_steps;
       //set Page title
    this.$store.commit('tutorial/setHeaderTitle', 'Etapes pour ' + this.countryData.short_name);
    });

   
  },
  components: { CountrySteps },

}
</script>
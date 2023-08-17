<template>
  <country-steps :country-steps-list="countryData.country_steps">
    <template #countryName>
      {{ countryData.name }}
    </template>
  </country-steps> 
</template>

<script> 
import CountrySteps from '../AddTutoriel/CountrySteps.vue' 
import { navigateToRoute } from '@/Utils/Navigation'
export default {
  data() {
    return {
      countryData: '',
      errors : [],
      errorStatus :''
    }
  },
  created() {
    let idCountry = parseInt(this.$route.params.id)
    this.$store.dispatch('countryStep/getByCountry', idCountry).then((response) => {
      this.countryData = response.data;
      //set Page title
      this.$store.commit('tutorial/setHeaderTitle', 'Etapes pour ' + this.countryData.short_name);

    }).catch((error)=> {
     // console.log(error)
       navigateToRoute.call(this,error.response.status);
    })

  },
  components: { CountrySteps },

}
</script>
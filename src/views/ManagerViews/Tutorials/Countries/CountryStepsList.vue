<template>
  <div> 
    <error-modal-component v-if="errors?.isError">
    <h5>Erreur {{ errors?.code }} inattendue</h5>
  </error-modal-component>
  <country-steps :country-steps-list="countryData.country_steps">
    <template #countryName>
      {{ countryData.name }}
    </template>
  </country-steps>
  
</div>
</template>

<script>
import CountrySteps from '../AddTutoriel/CountrySteps.vue'
import { navigateToRoute } from '@/Utils/Navigation'
import ConfirmationModalComponent from '@/components/modal/StaticbackdropModal.vue'
import ErrorModalComponent from '@/components/modal/ErrorModalComponent.vue'
export default {
  data() {
    return {
      countryData: '',
      errors: {
        isError : false,
        code:''
      }
    }
  },
  created() {
    let idCountry = parseInt(this.$route.params.id)
    this.$store.dispatch('countryStep/getByCountry', idCountry).then((response) => {
      this.countryData = response.data;

      this.$store.commit('tutorial/setHeaderTitle', 'Etapes pour ' + this.countryData.short_name); //set Page title
      this.$store.commit('countryStep/setSelectedCountry', { id: response.data.id })

    }).catch((error) => {
      navigateToRoute.call(this, error.response.status, 'manager403');
      this.errors = {
        isError: true,
        code : error.response.status
      }

    })

  },
  components: { CountrySteps, ErrorModalComponent, ConfirmationModalComponent },

}
</script>
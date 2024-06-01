<template>

    <div>     
       
        <PageTitle :isLoading="isDataLoading" :requestResponseMessage="requestResponse">
          Pays</PageTitle>    
        <section>
            <card-component :list="data" v-if="data && !isDataLoading" :onlyHeader="true" :routeName="routeName"></card-component> 
        </section>   
    </div>
 
</template>

<script> 
import CardComponent from '@/components/shared/CardComponent.vue'; 
import PageTitle from './../../../../components/shared/Manager/PageTitle.vue'
import errorMessage from '@/Utils/ErrorMessage'; 
export default{
  components: {  CardComponent, PageTitle },
  data () {
    return {
      isDataLoading : false,
        data: null,
        routeName : "ManagerTutoCountrySteps",
        requestResponse : null
    }
  },
  mounted() {

    this.isDataLoading = true;
    this.$store.dispatch('tutorial/getFlagUrlAndNameOfCountriesWithSteps')
      .then((response) => {
      
        this.data = response.data

      }).catch((error) => {
       
       this.requestResponse = errorMessage(error,true);

      }).finally(()=>{
        this.isDataLoading = false
      });
  },

}
</script>
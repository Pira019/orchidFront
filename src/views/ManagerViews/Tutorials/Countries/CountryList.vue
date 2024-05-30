<template>

    <div>     
       
        <PageTitle>Pays</PageTitle> 

        <request-alert class="container-fluid" :isSucceed="false" :responseMessage="requestResponse" v-show="!isDataLoading && requestResponse "></request-alert>

        <section>
            <card-component :list="data" v-if="data && !isDataLoading" :onlyHeader="true" :routeName="routeName"></card-component>
            <Spinner v-if="isDataLoading"></Spinner>
        </section>   
    </div>
 
</template>

<script>
import Spinner from '@/components/shared/Spinner.vue';
import CardComponent from '@/components/shared/CardComponent.vue';
import ErrorModalComponent from '@/components/modal/ErrorModalComponent.vue';
import PageTitle from './../../../../components/shared/Manager/PageTitle.vue'
import errorMessage from '@/Utils/ErrorMessage';
import RequestAlert from '@/components/shared/Alert/RequestAlert.vue';
export default{
  components: { Spinner, CardComponent, ErrorModalComponent, PageTitle, RequestAlert },
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
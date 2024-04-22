<template>
  <div class="container-fluid">
    <request-alert :isSucceed="false" :responseMessage="requestErrorMessage" v-if="requestErrorMessage"></request-alert>

    <div v-show="!requestErrorMessage">
    <div class="d-flex justify-content-center">
      <div class="text-center">
        <img :src="service?.countries.flag_url" :alt="service?.countries.name" class="img-fluid img-thumbnail" width="150">
        <p class="fw-bold">{{ service?.countries.name }}</p>
        <div class="btn-group " role="group" aria-label="Basic outlined"> 
          <router-link  :to="{name: 'ManagerTutoCountrySteps', params:{ id: service?.countries.id ?? 0 }}" class="btn btn-outline-success"> <font-awesome-icon icon="fa-person-chalkboard" size="1x"/></router-link>  
          <router-link :to="{name: 'ManagerCountrySteps', params:{ id: service?.countries.id ?? 0 }}" class="btn btn-outline-success">   <font-awesome-icon icon="fa-list" size="1x"/></router-link>
        </div> 
      </div>
    </div>

    <div class="row border-bottom pb-3 my-3">
      <div class="col">
        <h3 class="text-white fw-bold p-2 bg-success">Etapes</h3>
        <p class="" v-for="(step, index) in service?.countries.steps" :key="index">
          <span class="fw-bold"> {{ step.title }}</span>
        </p>
      </div>
    </div>

    <div class="row border-bottom pb-3 my-3">
      <div class="col">
        <h3 class="text-white fw-bold p-2 bg-success">Secteurs</h3>
        <p v-for="(disciplary, index) in service?.disciplanaries" :key="index">
          {{ disciplary.label }}
        </p>
      </div>
    </div>

    <div class="row border-bottom pb-3 my-3">
      <div class="col">
        <h3 class="text-white fw-bold p-2 bg-success">Universités</h3>
        <router-link :to="{ name: 'ManagerTutoCountrySteps', params: { id: university.id } }"
          v-for="(university, index) in service?.universities" :key="index">
          {{ university.name }}
        </router-link>
      </div>
    </div> 
  </div>
  </div>
</template>

<script>
import TableComponent from '@/components/shared/TableComponent.vue'
import RequestAlert from '@/components/shared/Alert/RequestAlert.vue'
import errorMessage from '@/Utils/ErrorMessage'

export default {
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      service: null,
      requestErrorMessage: '',
    }
  },
  mounted() {
    
    this.$store.dispatch('serviceManager/findService', this.id)
      .then((response) => {
        this.service = response.data
        this.$store.commit('serviceManager/setService', this.service);

      }).catch((error)=>{ 
          this.requestErrorMessage = errorMessage(error)
      }).finally(() => {
        this.$store.commit('serviceManager/finishDataLoading');
      })
  },

  unmounted() {
    this.$store.commit('serviceManager/hideServiceDetailHeader');
  },
  components: { TableComponent,RequestAlert },
}
</script>

    
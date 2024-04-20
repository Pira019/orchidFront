<template>
  <div class="container-fluid">  
    <div>
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

export default {
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      service: null
    }
  },
  mounted(){
    this.$store.dispatch('serviceManager/findService', this.id)
      .then((response) => {
        this.service = response.data
        this.$store.commit('serviceManager/setService',this.service);
      }).catch()

      .finally(() => {
        this.$store.commit('serviceManager/finishDataLoading');
      })
  },

  unmounted(){
    this.$store.commit('serviceManager/hideServiceDetailHeader');
  },
  components: { TableComponent },
}
</script>

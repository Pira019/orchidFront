<template>
    <div class="container-fluid">

        <section id="header">
            <h2>test</h2>
        </section>

        <div>

            <div class="row border-bottom pb-3 my-3">
                <div class="col-md-4">
                  <h3 class="text-white fw-bold p-2 bg-success">Etapes</h3>
                </div>
                <div class="col-md-7 m-2" >
                    <p class="" v-for="(step,index) in service?.countries.steps" :key="index">
                       <span class="fw-bold"> {{ step.title }}</span>
                    </p>
                </div>
           </div>

           <div class="row border-bottom pb-3 my-3">
                <div class="col-md-4">
                  <h3 class="text-white fw-bold p-2 bg-success">Secteurs</h3>
                </div>
                <div class="col-md-7 m-2" >
                    <p v-for="(disciplary,index) in service?.disciplanaries" :key="index">
                        {{ disciplary.label }}
                    </p>
                </div>
           </div>

           <div class="row border-bottom pb-3 my-3">
                <div class="col-md-4">
                  <h3 class="text-white fw-bold p-2 bg-success">Universités</h3>
                </div>
                <div class="col-md-7 m-2" >
                    <router-link :to="{name:'ManagerTutoCountrySteps', params:{id:university.id}}" v-for="(university,index) in service?.universities" :key="index">
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
    id : {type : String, required: true}
  },
  data () {
    return {
        service : null
    }
  },
    methods: {
      
    },

      mounted() { 
        this.$store.dispatch('serviceManager/findService', this.id)
            .then((response) => {
                this.service = response.data
            }).catch()

            .finally(() =>
            { 
                this.$store.commit('serviceManager/finishDataLoading');
            })

    },
    components: { TableComponent },
}
</script>

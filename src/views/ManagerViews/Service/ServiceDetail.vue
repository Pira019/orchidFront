<template>
  <div class="container-fluid">
    <div v-show="!requestResponse">
      <StaticbackdropModal v-show="isShowUniversityDetail" :title="modalTitle" :is-confirm-modal="false" :close-modal="!isShowUniversityDetail" :modalSize="'modal-lg'" @isConfirm="r => isShowUniversityDetail = r"> 
       <service-program :universityId="university.id" :university-name="university.name" :universityShortName="university.shortName"></service-program>
      </StaticbackdropModal>
      <div class="d-flex justify-content-center">
        <div class="text-center">
          <img :src="service?.countries.flag_url" :alt="service?.countries.name" class="img-fluid img-thumbnail"
            width="150">
          <p class="fw-bold">{{ service?.countries.name }}</p>
          <div class="btn-group " role="group" aria-label="Basic outlined">
            <router-link :to="{name: 'ManagerTutoCountrySteps', params:{ id: service?.countries.id ?? 0 }}"
              class="btn btn-outline-success"> <font-awesome-icon icon="fa-person-chalkboard" size="1x" /></router-link>
            <router-link :to="{name: 'ManagerCountrySteps', params:{ id: service?.countries.id ?? 0 }}"
              class="btn btn-outline-success"> <font-awesome-icon icon="fa-list" size="1x" /></router-link>
          </div>
        </div>
      </div>

      <div class="row border-bottom pb-3 my-3">
        <div class="">
          <h3 class="text-white fw-bold p-2 bg-success">Etapes</h3>
          <p class="text-uppercase" v-for="(step, index) in service?.countries.steps" :key="index">
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
          <div class="row border-bottom pb-2"  v-for="(university, index) in service?.universities" :key="index">
            <div class="col-md-8">
              <router-link class="text-uppercase font-weight-bold text-decoration-none " :to="{ name: 'ManagerTutoCountrySteps', params: { id: university.id } }"
                :title="university.shortName"> 
                {{ university.name }}
              </router-link>
            </div>
            <div class="col-md-2">
              <button class="btn btn-primary" title="Ajouter pour ce service" @click="handleModalActiveService(university.id,university.name,university.shortName)">Ajouté</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableComponent from '@/components/shared/TableComponent.vue'
import RequestAlert from '@/components/shared/Alert/RequestAlert.vue'
import errorMessage from '@/Utils/ErrorMessage';
import lang from '@/lang/fr.json'
import StaticbackdropModal from '@/components/modal/StaticbackdropModal.vue';
import ServiceProgram from './ServiceProgram.vue';

export default {
  methods: { 
    handleModalActiveService(universityId,universityName,universityShortName)
    {
      this.isShowUniversityDetail=true;
      this.modalTitle = lang.add_service;
      this.university.id = universityId;
      this.university.name = universityName;
      this.university.shortName = universityShortName;
    }
  },
  props: {
    id: { type: String, required: true },
    requestResponse:{}
  },
  data() {
    return {
      service: null,
      isShowUniversityDetail:false,
      modalTitle : null,    
      university: {
        id : null,
        name : null,
        shortName: null
      }   
    }
  },
  mounted() {

    this.$store.dispatch('serviceManager/findService', this.id)
      .then((response) => {
        this.service = response.data
        this.$store.commit('serviceManager/setService', this.service);

      }).catch((error) => {
        this.$store.commit('serviceManager/responseMessage', errorMessage(error, true));
      }).finally(() => {
        this.$store.commit('serviceManager/finishDataLoading');
      })

    const pageTitle = lang.page.servives.service
    this.$store.commit('serviceManager/setPageTitle', pageTitle);
  },

  unmounted() {
    this.$store.commit('serviceManager/hideServiceDetailHeader');
  },
  components: { TableComponent,RequestAlert,StaticbackdropModal, ServiceProgram },
}
</script>

    
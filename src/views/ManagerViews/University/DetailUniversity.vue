<template>
  <div class="container-fluid">
    <error-modal-component v-if="unexpectedError"></error-modal-component>
    <university-layout :isShowBtn="true" :title="'Détail de l\'université'">
      <spinner class="m-2" v-if="isLoading"></spinner>

      <div>

        <div id="info" class="mb-5">
          <h2 class="display-6"> {{ university.name }} <span v-if="university.shortName">( {{
            university.shortName?.toUpperCase() }}
              )</span></h2>
        </div>

        <div v-if="!isLoading">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
                aria-selected="true">Présentation </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="Adresse-tab" data-toggle="tab" href="#Adresse" role="tab" aria-controls="Adresse"
                aria-selected="false">Adresse</a>
            </li>
            <li class="nav-item" @click="getPrograms">
              <a class="nav-link" id="Programme-tab" data-toggle="tab" href="#Programme" role="tab"
                aria-controls="Programme" aria-selected="false">Programme</a>
            </li>
          </ul>
          <div class="tab-content mt-5" id="myTabContent">
            <!--Info university-->
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div class="d-flex justify-content-between" v-if="!isEdit">
                <div>
                  <h3 class="h6 mb-3">{{ university.name }}</h3>
                  <p>En sigle : <span class="fw-bold">{{ university.shortName?.toUpperCase() }}</span> </p>
                  <p>Site web : <a :href="university.webSite" target="_blank" class="text-success fw-bold"> {{
                    university.webSite }} </a> </p>
                  <p>Derniere mise à jour: {{ formattedDate_(university.updated_at) }}</p>
                </div>
                <div>
                  <button class="btn btn-warning" @click="isEdit = true"><font-awesome-icon icon="fa-pen"
                      class="text-white" /></button>
                </div>
              </div>
              <!--Edit component-->
              <AddUniversity v-if="isEdit" :university-to-up-date="university" @closeEditForm="isEdit = false"
                :is-edit="true" :title="'Modifier l\'université'" @updateUniversity=" university = $event">
              </AddUniversity>

            </div>
            <!-- End info university-->

            <!--Info adress university-->
            <div class="tab-pane fade" id="Adresse" role="tabpanel" aria-labelledby="Adresse-tab">
              <div class="d-flex justify-content-between" v-if="!isEditAdress">
                <div>
                  <h3 class="h6 mb-3">{{ university.name }}</h3>
                  <p>Pays : <span class="fw-bold">{{ university.city?.country.name }}</span> <img
                      :src="university.city?.country.flag_url" alt="drappeau pays" class="img-fluid mx-3" width="35"> </p>
                  <p>Ville : <span class="fw-bold">{{ university.city?.name }}</span> </p>
                  <p>Code postale : <span class="fw-bold">{{ university.address?.code_postal }}</span> </p>
                  <p>Adresse : <span class="fw-bold">{{ university.address?.adress }}</span> </p>
                  <p>Derniere mise à jour: {{ formattedDate_(university.address?.updated_at) }}</p>
                </div>

                <div>
                  <button class="btn btn-warning" @click="isEditAdress = true"><font-awesome-icon icon="fa-pen"
                      class="text-white" /></button>
                </div>
              </div>
              <!-- End adress university-->
              <AddAddress v-if="isEditAdress" @updateAdress=" university.address = $event" :title="'Modifier l\'addresse'"
                @closeEditFormAdress="isEditAdress = false" :isEdit="true" :adress-to-up-date="university"></AddAddress>

            </div>
            <div class="tab-pane fade" id="Programme" role="tabpanel" aria-labelledby="Programme-tab">
              <button  @click="showPersistModal" class="btn btn-success"><font-awesome-icon icon="fa-plus" class="text-white"/></button>
              <!--Persiste modal add program-->
              <StaticbackdropModal :is-confirm-modal="isConfirmModal" :closeModal="closeModal" :title="persistModalTitle" @isConfirm="handlePersistModal" :modalSize="'modal-lg'">
                <add-program @closePersiteModal="closeModal=true" :isModalClosed="closeModal"></add-program>
              </StaticbackdropModal>

              <AccordionComponent v-if="listOfPrograms?.length" class="col mt-5" :data="sortedListOfPrograms" :is-program="true"
                @findProgram="handleFindProgram" :typeAccordion="'no-step'">

                <div>
                  <p> <span class="fw-bold"> Cycle : </span> {{ program.cycle }} </p>
                  <p> <span class="fw-bold"> Durée : </span> {{ program.duration }} </p>
                  <p> <span class="fw-bold"> Langue(s) : </span> {{ program.languages }} </p>
                  <p> <span class="fw-bold"> Chemin d'admission : </span> {{ program.admission_scheme }} </p>                  
                  <p> <span class="fw-bold"> Secteur : </span> {{ program.discipline_name }} </p>
                </div>

              </AccordionComponent>
            </div>
          </div>
        </div>

      </div>
    </university-layout>


  </div>
</template>

<script>
import ErrorModalComponent from '@/components/modal/ErrorModalComponent.vue'
import UniversityLayout from './UniversityLayout.vue'
import Spinner from '@/components/shared/Spinner.vue';
import formattedDate from '@/Utils/formattedDate'
import AddUniversity from './AddUniversity.vue';
import { navigateToRoute } from '@/Utils/Navigation';
import AddAddress from './AddAddress.vue';
import { mapGetters } from 'vuex'; 
import { programModel } from '@/model/programs'
import AccordionComponent from '@/components/shared/AccordionComponent.vue';
import StaticbackdropModal from '@/components/modal/StaticbackdropModal.vue';
import AddProgram from './program/addProgram.vue';
import modalText from '@/Utils/json/TextModal.json'; 

export default {
  methods: {

    formattedDate_(date) {
      return formattedDate(date)
    },

    
    handlePersistModal(){
      this.closeModal = true; 
    },

    showPersistModal(){
      this.persistModalTitle = modalText.program.ajout;
      this.closeModal = false; 
    },

    getPrograms() {

      this.$store.dispatch('universityManager/getUniversityPrograms', this.universityId)
        .then((response) => {
          this.$store.commit('universityManager/setPrograms', response.data)

        }).catch((error) => {
          this.handleError(error);
        });

    },

    handleFindProgram(programDetail) {
      this.program = programDetail;
    },

    handleError(error) {
      navigateToRoute.call(this, error.status, 'manager403');
      this.isLoading = false;
      this.unexpectedError = true; 
    } 
  },
  components: { ErrorModalComponent, UniversityLayout, Spinner, AddUniversity, AddAddress, AccordionComponent, StaticbackdropModal, AddProgram },
  data() {
    return {
      unexpectedError: false,
      university: {},
      isLoading: false,
      isEdit: false,
      program: programModel,
      isEditAdress: false,
      universityId: parseInt(this.$route.params.id), 
      persistModalTitle : '',
      isConfirmModal : false,
      closeModal : true
    }
  },

  computed: {
    ...mapGetters('universityManager', {
      listOfPrograms: 'getPrograms',
    }),

    sortedListOfPrograms() {
      return this.listOfPrograms.slice().sort((a, b) => a.program_name.localeCompare(b.program_name))
      .map(program => ({ ...program, description: program.program_description }));;
    },
  },

  mounted() {

    this.isLoading = true;

    this.$store.dispatch('universityManager/findUniversity', this.universityId).then((response) => {
      this.university = response.data;
      this.isLoading = false;

    }).catch((error) => {
      this.handleError(error);
    });
  },

}
</script>
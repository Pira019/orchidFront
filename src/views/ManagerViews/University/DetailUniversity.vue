<template>
  <div class="container-fluid"> 
      <div>  
        <div id="info" class="mb-5">
          <h2 class="display-6 fw-bolder"> {{ university.name }} <span v-if="university.shortName">( {{
            university.shortName?.toUpperCase() }}
              )</span></h2>
        </div>

        <div>
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
              <button  @click="closeModal = false" class="btn btn-success"><font-awesome-icon icon="fa-plus" class="text-white"/></button>
              <!--Persiste modal add program-->
              <StaticbackdropModal :is-confirm-modal="showDeleteConfirmationModal" :closeModal="closeModal" :title="modalTitle" @isConfirm="handlePersistModal" :modalSize="'modal-lg'">
                <add-program v-if="!showDeleteConfirmationModal && !isAddDateAdmission" :programToEdit="programToEdit"  @closePersiteModal="closeModal=true;programToEdit=null;" :isModalClosed="closeModal" @showPersistModalResponse=handlePersisteRequestModal></add-program> 
               
                <div v-if="showDeleteConfirmationModal" >
                  <p> <span class="text-white bg-danger">Attention</span> Vous êtes sur le point de supprimer définitivement le programme</p>
                  <p class="fw-bold text-uppercase"> {{programNameToDelete}}</p>
                  <p class="confirmation-message"> Cette action est irréversible. Êtes-vous sûr de vouloir continuer ? </p>      
                </div>

                <dateAdmissionForm v-if="isAddDateAdmission" :program-id="program.id" @newDateAdded="newAdmissionDate"  @closePersiteModal="closeModal=true"></dateAdmissionForm>

              </StaticbackdropModal>

              <AccordionComponent v-if="listOfPrograms?.length" class="col mt-5" :data="sortedListOfPrograms" :is-program="true" @editUniversityProgram="handleUpdateUniversityProgram" @deleteUniversityProgram="hadleDeleteUniversityProgram"
                  @findProgram="handleFindProgram" :typeAccordion="'no-step'"> 
                 
                  <template #default="{ index }">                
                    <tap-component :tabNames="tabNames" :prefix="'_'+index">

                      <template v-slot:[slotName(0)]> <!--Info university voir DetailUniversityTabNames Enum-->
                        <div>
                            <p> <span class="fw-bold"> Cycle : </span> {{ program.cycle }} </p>
                            <p> <span class="fw-bold"> Durée : </span> {{ program.duration }} </p>
                            <p> <span class="fw-bold"> Langue(s) : </span> {{ program.languages }} </p>
                            <p> <span class="fw-bold"> Chemin d'admission : </span> {{ program.admission_scheme }} </p>                  
                            <p> <span class="fw-bold"> Secteur : </span> {{ program.discipline_name }} </p>
                        </div> 
                      </template>

                      <template v-slot:[slotName(1)] > <!--admission date university-->
                         <div v-if=" program?.admission_date?.length">
                          <p> <span class="fw-bold"> Lien : </span> <a :href="program?.admission_date[0].link" target="_blank"> Lien d'inscription</a> </p>
                          <p> <span class="fw-bold"> Session admission : </span> {{ program?.admission_date[0].session_admission}} </p>
                          <p> <span class="fw-bold"> Date début : </span> {{ program?.admission_date[0].start_at  }} </p>
                          <p> <span class="fw-bold"> Date fin : </span> {{ program?.admission_date[0].end_at  }}  </p> 
                          <p> <span class="fw-bold"> Dernière modification : </span>  {{ formattedDate_(program?.admission_date[0].updated_at) }} </p> 
                         </div>

                         <div v-else> 
                          <button class="btn btn-danger" @click="addAdmissionDate">Ajouter</button>
                            <p>Aucune date pour cette session</p>
                         </div>
                      </template> 

                      </tap-component> 
                  </template>
              
                </AccordionComponent>
            </div>
          </div>
        </div>

      </div> 
    <!--Modals-->
    <RegisterSuccessModalComponent :handle-modal="false" :isSuccess="isPersistSuccessful" :codeErreur="codeErreur">
      <p>L'opération a été effectuée avec succès</p> 
    </RegisterSuccessModalComponent>
  </div>
</template>

<script> 
import formattedDate from '@/Utils/formattedDate'
import AddUniversity from './AddUniversity.vue'; 
import AddAddress from './AddAddress.vue';
import { mapGetters } from 'vuex'; 
import { programModel } from '@/model/programs'
import AccordionComponent from '@/components/shared/AccordionComponent.vue';
import StaticbackdropModal from '@/components/modal/StaticbackdropModal.vue';
import AddProgram from './program/addProgram.vue';
import modalText from '@/Utils/json/TextModal.json';  
import RegisterSuccessModalComponent from '@/components/modal/RegisterSuccessModalComponent.vue';  
import TapComponent from '@/components/shared/TapComponent.vue';
import { DetailUniversityTabNames } from '@/enums';
import dateAdmissionForm from './program/dateAdmissionForm.vue';
import errorMessage from '@/Utils/ErrorMessage';

export default {
  methods: {

    addAdmissionDate()
    {
      this.isAddDateAdmission = true,
      this.closeModal = false 
    },

    newAdmissionDate(admission){
      this.program.admission_date[0]=admission; 
    },
    slotName(index){
      return this.tabNames[index]
    },

    handleUpdateUniversityProgram(programToEdit_){ 
      this.closeModal = false;
      this.programToEdit = {...programToEdit_};
    },

    formattedDate_(date) {
      return formattedDate(date)
    },

    hadleDeleteUniversityProgram(programToDelete_){
      this.closeModal = false;
      this.showDeleteConfirmationModal = true;
      this.programToDelete = programToDelete_; 
    },
    
    handlePersistModal(confirmAction=false){     // when user click on confirm
       this.closeModal = true;
      // delete program
      if(confirmAction){
        this.showDeleteConfirmationModal && this.handleDeleteProgram();
      }
      this.showDeleteConfirmationModal = false;
      this.programToEdit = null;
      this.isAddDateAdmission = false      
    },

    handleDeleteProgram() {

      let codeErreur = null;
      let isSuccessed = true;

      this.$store.dispatch('universityProgramManager/deleteUniversityProgram', this.programToDelete?.id).then(() => {
      this.$store.commit('universityManager/deleteProgramToList', this.programToDelete?.id)

      }).catch((error) => {

        isSuccessed = false;

        if (!error.response) {       
          codeErreur = error.code;
          return;
        }        
        codeErreur = error.response?.status;
        this.errorMessages(error);
        
      }).finally(() => {
        this.handlePersisteRequestModal(isSuccessed, codeErreur);  
      })

    },

    getPrograms()
    {

      this.$store.dispatch('universityManager/getUniversityPrograms', this.universityId)
        .then((response) => {
          this.$store.commit('universityManager/setPrograms', response.data)

        }).catch((error) => {
          this.errorMessages(error);
        });
    },

    handleFindProgram(programDetail) {
      this.program = programDetail;
    }, 
    handlePersisteRequestModal(n,codeErreur){
      this.isPersistSuccessful = n;
      this.codeErreur = codeErreur;

      $(document).ready(function () {
        $("#successModal").modal('show');
      });     
    }

  },
  data() {
    return { 
      university: {},
      isEdit: false,
      program: programModel,
      isEditAdress: false,
      universityId: parseInt(this.$route.params.id),  
      isConfirmModal : false,
      closeModal : true, 
      isPersistSuccessful : null,
      codeErreur : null,
      showDeleteConfirmationModal : null, 
      programToDelete : null,
      errorMessages:[],
      programToEdit : null,
      tabNames : Object.values(DetailUniversityTabNames),
      isAddDateAdmission : false

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

    modalTitle() {
      return this.showDeleteConfirmationModal
        ? modalText.program.delete
        : this.programToEdit
        ? modalText.program.edit
        : this.isAddDateAdmission 
        ? modalText.addAdmissionDate
        : modalText.program.ajout;
    },


    programNameToDelete(){
      return this.programToDelete.name;
    }
  },

  mounted() {
  
    this.$store.commit('ManagerStore/startDataLoading'); 
    this.$store.dispatch('universityManager/findUniversity', this.universityId)
    .then((response) => {
      this.university = response.data;       
    }).catch((error) => {
      this.$store.commit('ManagerStore/responseMessage', errorMessage(error,true)); 
    }).finally(()=>{
      this.$store.commit('ManagerStore/finishDataLoading')
    });
    this.$store.commit('ManagerStore/setPageTitle',"Détail université"); 
  },

  unmounted() { 
    this.$store.commit('ManagerStore/resetResponseMessage');
  },

  
  components: { dateAdmissionForm, AddUniversity, AddAddress, AccordionComponent, StaticbackdropModal, AddProgram, RegisterSuccessModalComponent, TapComponent },

}
</script>
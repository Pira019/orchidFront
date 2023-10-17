<template>
  <div class="container-fluid">
    <error-modal-component v-if="unexpectedError"></error-modal-component>
    <university-layout :isShowBtn="true" :title="'Détail de l\'université'">
      <spinner class="m-2" v-if="isLoading"></spinner>

      <div>

        <div id="info" class="mb-5">
          <h2 class="display-6"> {{ university.name }} <span v-if="university.shortName">( {{ university.shortName }}
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
            <li class="nav-item">
              <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact"
                aria-selected="false">Contact</a>
            </li>
          </ul>
          <div class="tab-content mt-5" id="myTabContent">
            <!--Info university-->
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div class="d-flex justify-content-between" v-if="!isEdit">
                <div >
                  <h3 class="h6 mb-3">{{ university.name }}</h3>
                  <p>En sigle : <span class="fw-bold">{{ university.shortName }}</span> </p>
                  <p>Site web : <a :href="university.webSite" target="_blank" class="text-success fw-bold"> {{
                    university.webSite }} </a> </p>
                  <p>Derniere mise à jour: {{ formattedDate_(university.updated_at) }}</p>
                </div>
                <div>
                  <button class="btn btn-outline-success" @click="isEdit=true"><font-awesome-icon icon="fa-pen"/></button>
                </div>              
              </div>
              <!--Edit component-->
             <AddUniversity v-if="isEdit" :university-to-up-date="university" :is-edit="true" :title="'Modifier l\'université'" @updateUniversity="(data) => university = data"></AddUniversity>

            </div>
            <!-- End info university-->

            <!--Info adress university-->
            <div class="tab-pane fade" id="Adresse" role="tabpanel" aria-labelledby="Adresse-tab">
              <div>
                <h3 class="h6 mb-3">{{ university.name }}</h3>
                <p>Pays : <span class="fw-bold">{{ university.city.country.name }}</span> <img
                    :src="university.city.country.flag_url" alt="drappeau pays" class="img-fluid mx-3" width="35"> </p>
                <p>Ville : <span class="fw-bold">{{ university.city.name }}</span> </p>
                <p>Code postale : <span class="fw-bold">{{ university.address?.code_postal }}</span> </p>
                <p>Adresse : <span class="fw-bold">{{ university.address?.adress }}</span> </p>
                <p>Derniere mise à jour: {{ formattedDate_(university.addres?.updated_at) || 'ggg' }}</p>
              </div>
              <!-- End adress university-->

            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
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
export default {
  methods: {
    formattedDate_(date) {
      return formattedDate(date)
    }
  },
  components: { ErrorModalComponent, UniversityLayout, Spinner, AddUniversity },
  data() {
    return {
      unexpectedError: false,
      university: {},
      isLoading: false,
      isEdit : false,
    }
  },

  created() {
    const id = parseInt(this.$route.params.id);

    this.isLoading = true;

    this.$store.dispatch('universityManager/findUniversity', id).then((response) => {
      this.university = response.data;
      this.isLoading = false;

    }).catch((error) => {

      navigateToRoute.call(this, error.response.status, 'manager403');
      this.unexpectedError = false;
      this.isLoading = false;
    });
  },

}
</script>
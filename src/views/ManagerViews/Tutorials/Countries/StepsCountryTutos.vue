<template>
    <div>
        
      <ViewVideos></ViewVideos>
        <section class="container-fluid">
            <header class="text-center mb-5">
                <h1 class="text-success">Tutoriels pour <mark> {{ countryDetail.name }} </mark></h1>
            </header>
            <div class="row  mt-3">
                <div class="col-md-2 overflow-auto">
                    <div class="mb-3">
                        <img :src="countryDetail.flagUrl" alt="img-drapeau" class="img-thumbnail" width="100" />
                    </div>
                    <VerticalMenuComponent :data="stepsList" @getStep="getStepDetail"></VerticalMenuComponent>
                </div>

                <AccordionComponent class="col" :data="[detailStep]" :detail="true" id="stepsAccordion">
                    <div class="d-flex justify-content-between">
                        <h3 class="p-2 text-success fw-bold h4"> <font-awesome-icon icon="fa-person-chalkboard" /> Tutoriels
                        </h3>
                        <div>
                            <button class="btn btn-primary rounded-circle" title="Ajouter un tuto"
                                @click="addNewTuto(), isEdit = false"><font-awesome-icon icon="plus" /></button>
                        </div>
                    </div>

                    <spinner v-if="isDataLoaing" class="m-2"></spinner>
                    <AccordionComponent v-if="!isDataLoaing" :data="tutos" id="tutos" :typeAccordion="'tutos'"
                        @editTuto="editTutorial" :detail="true" :showDetailBtn="true" @tutoToDelete="initiateDeleteProcess">  
                    </AccordionComponent>
                </AccordionComponent>

            </div>
            <!--Modal-->
            <add-tuto-modal @updatedTuto="updatedTuto" @addedTuto="addedTutoToAccordionComponent_" :country="countryDetail"
                :stepTitle='detailStep.title' :stepId="detailStep.id" :isEdit="isEdit" :orderNbr="detailStep.order"
                :new-tuto-order="orderNewTuto"></add-tuto-modal>
        </section>
        <confirmation-modal-component :closeModal="!openDeleteModal" @isConfirm="handleDeleteConfirmation">
            <mark class="fw-bold"> un tutoriel </mark>
        </confirmation-modal-component>
    </div>
</template>

<script>
import CollapseComponent from '@/components/shared/AccordionComponent.vue';
import VerticalMenuComponent from '@/components/shared/VerticalMenuComponent.vue';
import { mapGetters } from 'vuex';
import AddTutoModal from './AddTutorialsToStep/AddTutoModal.vue';
import AccordionComponent from '@/components/shared/AccordionComponent.vue';
import Spinner from '@/components/shared/Spinner.vue';
import ConfirmationModalComponent from '@/components/modal/StaticbackdropModal.vue';
import ViewVideos from '@/components/shared/ViewVideos.vue';

export default {
    methods: {

        // Delete tuto process
        initiateDeleteProcess(tuto) {
            this.tutoToDelete = tuto;
            this.openDeleteModal = true;
        },

        handleDeleteConfirmation(modalReponse) {
            if (modalReponse) { this.deleteTuto(); return }
            this.openDeleteModal = modalReponse;
        },

        deleteTuto() {
            this.$store.dispatch('tutorial/deleteTuto', this.tutoToDelete.id).then(() => {
                this.openDeleteModal = false;
                this.reorderTutoAfterDelete()
            })
        },

        reorderTutoAfterDelete() {
            this.tutos = this.tutos.filter(tutorial => tutorial.id !== this.tutoToDelete.id);
            //reorder
            this.tutos.forEach(tuto => {
                if (tuto.order > this.tutoToDelete.order) {
                    tuto.order = tuto.order-1;
                };
            })
        },

        //update list without refresh data base
        updatedTuto(updatedTuto_) {
            const index = this.tutos.findIndex(item => item.id === updatedTuto_.id);
            if (index !== -1) {
                this.tutos[index].title = updatedTuto_.title;
                this.tutos[index].description = updatedTuto_.description;
                this.tutos[index].description = updatedTuto_.description;
                this.tutos[index].updated_at = updatedTuto_.updated_at;
            }
        },

        addedTutoToAccordionComponent_(newTuto) {
            this.tutos.push(newTuto)
        },

        editTutorial(tutoEdit) {
            this.isEdit = true;
            this.orderNewTuto = tutoEdit.order
            this.$store.commit('tutorial/selectTuto', tutoEdit);
            this.showModalAddTuto();
        },

        getStepDetail(step) {
            this.detailStep = step;
            this.getTutosByStep(this.detailStep.id);
        },

        addNewTuto() {
            this.orderNewTuto = this.tutos.length + 1;
            this.showModalAddTuto();
        },

        showModalAddTuto() {
            $(document).ready(function () {
                $("#TutoModal").modal('show');
            })
        },

        getTutosByStep(stepCountryId) {
            this.isDataLoaing = true
            this.$store.dispatch('tutorial/getByStepCountryId', stepCountryId).then((response) => {
                 this.isDataLoaing = false;
                this.tutos = response.data
                this.orderNewTuto = this.tutos.length + 1
            });

        }
    },
    data() {
        return {
            detailStep: '',
            isDataLoaing: false,
            tutos: [],
            orderNewTuto: 0,
            isEdit: false,
            tutoToDelete: {},
            openDeleteModal: false,
        }
    },
    computed: {
        ...mapGetters('tutorial', {
            stepsList: 'getSteps',
            countryDetail: 'getCountryDetail',
        }),
    },
    created() {
        const idCountry = parseInt(this.$route.params.id)
        this.$store.dispatch('tutorial/getCountryStepsByCountryId_', idCountry).then((response) => {
            this.detailStep = response.data.country_steps[0];
            this.getTutosByStep(this.detailStep?.id)
            this.$store.commit('tutorial/setSteps', response.data.country_steps);
            this.$store.commit('tutorial/setCountryDetail', { name: response.data.name, short_name: response.data.short_name, flagUrl: response.data.flag_url });
        });
    },
    components: { VerticalMenuComponent, CollapseComponent, AddTutoModal, AccordionComponent, Spinner, ConfirmationModalComponent,ViewVideos }
}
</script>
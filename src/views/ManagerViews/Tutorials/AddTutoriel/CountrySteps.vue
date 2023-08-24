<template>
    <div>
        <!--modals-->
        <error-modal-component v-if="unexpectedError">
            <h5>Erreur {{ codeErreur }} inattendue</h5>
        </error-modal-component>
        <register-success-modal-component v-if="isSucceed">
            <slot v-if="!isEdit"> Etape(s) sauvegardée(s) dans le système</slot>
            <slot v-else>La modification est sauvegardées dans le système</slot>
        </register-success-modal-component>
        <!--End of modals-->
        <!--Spider-->
        <Spinner v-if="isLoading"></Spinner>
        <!--end spider-->
        <div class="mb-5" id="stepsOfCountry">
            <div>
                <h2 class="h5 lead text-center">Etapes génerales à suivre pour étudier : <span class="fw-bold">
                        <slot name="countryName">{{ countrySelected.name }}</slot>
                    </span></h2>
                <button @click="showForm = true, state.order = countrySteps.length + 1, isEdit = false, scrollToSection()"
                    class="btn btn-secondary mt-1">Ajouter une étape pour <slot name="countryName">{{ countrySelected.name }}
                    </slot>
                </button>
            </div>
            <ErrorAlert :show="this.errors?.length !== 0 && !unexpectedError" :response="errors" class="m-2"> </ErrorAlert>
            <section v-if="countrySteps.length">
                <table class="table caption-top table-hover">
                    <caption>Nombre d'étapes : <span class="fw-semibold">{{ countrySteps.length }}</span></caption>
                    <thead class="table-dark">
                        <tr>
                            <th scope="col" title="visibilité"></th>
                            <th scope="col" title="Numero étape">N</th>
                            <th scope="col">Titre</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(step, index) in countrySteps" :key="index">
                            <th scope="row" @click="editStepVisibility(index)">
                                <SwitcheBtnComponent :is-ckecked="step.visibility"></SwitcheBtnComponent>
                            </th>
                            <th scope="row">{{ step.order }}</th>
                            <td>{{ step.title }}</td>
                            <td>{{ step.description }}</td>
                            <td>
                                <button class="btn btn-warning m-1" title="Modifier cette étape"
                                    @click="fillFormToUpdateStep(step)"><font-awesome-icon icon="fa-pen"
                                        style="color: #f0f0f0;" /></button>
                                <button class="btn btn-danger m-1" @click="deleteStep(index)"
                                    title="Supprimer cette étape"><font-awesome-icon icon="fa-trash" /></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section v-if="!countrySteps.length" class="mt-5">
                <p>Aucune étape créée pour ce pays</p>
            </section>
        </div>

        <div ref="formSection" v-if="showForm">
            <form novalidate v-on:submit.prevent="onSubmit">
                <div class="row">
                    <div class="form-group col-sm-4">
                        <label for="Titre" class="fw-bold">Titre *</label>
                        <input type="text" id="Titre" class="form-control" :class="[v$.title.$error ? 'is-invalid' : '']"
                            v-model.trim="state.title">
                        <div class="invalid-feedback" v-if="v$.title.$error">
                            <span v-for="(error, index) of v$.title.$errors" :key="index">
                                {{ error.$message }}
                            </span>
                        </div>
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="stepNum" class="fw-bold">Numéro étape *</label>
                        <input type="number" min="1" class="form-control" id="stepNum" v-model="state.order">
                    </div>
                    <div class="form-group col-sm-4">
                        <label for="Description" class="fw-bold">Description</label>
                        <textarea class="form-control" id="Description" rows="5" v-model="state.description"></textarea>
                    </div>
                    <div class="form-group mt-3">
                        <button class="btn btn-primary" @click="addStep" v-if="!isEdit">Ajouter une étape</button>
                        <SubmitBtnComponent :loading="btnLoading" class="btn  mx-1" :class="btnValidationStyle"
                            @click="saveSteps" :disabled="!countrySteps.length">{{ isEdit ? txtBtnEdit : 'Enregister' }}
                        </SubmitBtnComponent>
                        <button class="btn btn-outline-danger" @click="showForm = false" type="reset">Annuler</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';
import { mapGetters } from 'vuex';
import { computed, reactive } from 'vue';
import customeMessage from '@/Utils/validationMessages';
import useVuelidate from '@vuelidate/core';
import ErrorService from '@/Services/ErrorService';
import ErrorModalComponent from '@/components/modal/ErrorModalComponent.vue';
import ErrorAlert from '@/components/shared/Alert/ErrorAlert.vue';
import RegisterSuccessModalComponent from '@/components/modal/RegisterSuccessModalComponent.vue';
import { navigateToRoute } from '@/Utils/Navigation';
import SwitcheBtnComponent from '@/components/shared/SwitcheBtnComponent.vue';
import Spinner from '@/components/shared/Spinner.vue';

export default {
    //countryStepsList when show list without click to add steps
    props: ['countryStepsList'],
    methods: {

        addStep() {

            this.v$.$validate();
            if (this.v$.$error) {
                return false;
            }
            this.countrySteps.push(this.createCoutryStepModel())
            this.state.order++
            this.v$.$reset();
            this.state.title = ''
            this.state.description = ''
        },

        fillFormToUpdateStep(step) {

            this.state.title = step.title;
            this.state.id = step.id,
                this.state.description = step.description;
            this.state.order = step.order
            this.showForm = true;
            this.scrollToSection()
            this.isEdit = true;
            this.btnValidationStyle = "btn-warning"


        },

        editStepVisibility(index) {

            this.countrySteps[index].visibility =  !this.countrySteps[index].visibility ;
            let updateStep = this.countrySteps[index];
            if (updateStep.id === undefined) { 
                return true;
            }

            this.$store.dispatch('countryStep/editStep', {id:updateStep.id, visibility : updateStep.visibility}).then(() => {
            }).catch((error)=> {
                navigateToRoute.call(this, error.response.status, 'manager403');
                this.unexpectedError = true;
                this.codeErreur =  error.response.status;
            })
            this.unexpectedError =false;
        },

        updateStep() {
            this.v$.$validate();
            if (this.v$.$error) {
                return false
            }
            this.btnLoading = true;


            this.$store.dispatch('countryStep/editStep', this.state).then(() => {
                this.btnLoading = false
                this.isSucceed = true;

                this.countrySteps = this.countrySteps.map((originalItem) =>
                    originalItem.id === this.state.id ? this.state : originalItem
                );
                this.showForm = false;
            })
                .catch((error) => {
                    navigateToRoute.call(this, error.response.status, 'manager403');
                })
            this.isSucceed = false
        },

        deleteStep(index) {
            this.orderSteps(index);
            this.countrySteps.splice(index, 1);
            this.state.order = this.countrySteps.length + 1
        },
        saveSteps() {

            let copyCountrySteps = this.countrySteps;
            if (this.isEdit) {
                this.updateStep()
                return true
            }

            if (this.countryStepsList?.length && this.countryStepsList !== undefined) {
                this.countrySteps = this.countrySteps.filter(steps => steps.id === undefined);
                if (this.countryStepsList.length === this.countrySteps.length) {
                    return false;
                }
            }

            if (this.countrySteps.length != 0) {
                this.btnLoading = true;
                this.$store.dispatch('countryStep/saveSteps', this.countrySteps).then(() => {
                    this.isSucceed = true;
                    this.btnLoading = false;
                    this.showForm = false;
                    //redirect 
                    this.$router.push({ name: "ManagerCountrySteps", params: { id: this.countrySelected?.id } });

                })
                    .catch((error) => {
                        this.btnLoading = false;
                        navigateToRoute.call(this, error.response.status, 'manager403');
                        let errors_ = ErrorService.handleErrorHttp(error.response?.status, error.response?.data.errors)
                        if (!errors_) {
                            this.unexpectedError = true;
                            this.codeErreur = error.response?.status;
                        }
                        this.errors = errors_?.errorMessage
                    });
                this.unexpectedError = false;
                //    this.countrySteps = [];
            }

            this.countrySteps = copyCountrySteps;
            this.isSucceed = false;

        },
        orderSteps(index) {
            for (var i = 0; i < this.countrySteps.length; i++) {
                if (this.countrySteps[i].order === index + 1) {
                    if (this.countrySteps[i + 1]) {
                        this.countrySteps[i + 1].order = this.countrySteps[i + 1].order - 1
                    }
                }
            }
        },
        createCoutryStepModel() {
            return {
                title: this.state.title,
                order: this.state.order,
                description: this.state.description,
                country_id: this.countrySelected?.id,
            }
        },

        scrollToSection() {
            const sectionForm = this.$refs.formSection
            window.scrollTo({
                top: sectionForm.offsetTop,
                behavior: 'auto'
            })
        }
    },

    data() {
        return {
            countrySteps: [],
            btnLoading: false,
            unexpectedError: false,
            errors: [],
            codeErreur: '',
            isSucceed: false,
            btnValidationStyle: 'btn-success',
            isEdit: false,
            showForm: false,
            txtBtnEdit: 'Modifier cette étape',
            isLoading: false

        }
    },

    setup() {
        const state = reactive({
            title: '',
            order: 1,
            description: '',
            id: '',
            visibility: ''
        })

        const rules = computed(() => {
            return {
                title: { required: customeMessage("title", 'required') },
            }
        })
        const v$ = useVuelidate(rules, state);
        return { state, v$ }
    },
    computed: {
        ...mapGetters('countryStep', {
            countrySelected: 'getCountrySelected',
        }),
    },

    created() {
        this.isLoading = true,
            this.$watch('countryStepsList', (countryStepsList) => {
                if (countryStepsList !== null | countryStepsList !== undefined) {
                    this.showForm = false;
                    this.countrySteps = countryStepsList;
                    this.isLoading = false
                    return true
                }

            });

        if (!this.countrySteps.length && this.countryStepsList === undefined) {
            this.isLoading = false;
            this.showForm = true;
        }
    },
    components: { SubmitBtnComponent, ErrorModalComponent, ErrorAlert, RegisterSuccessModalComponent, SwitcheBtnComponent, Spinner }
}


</script>

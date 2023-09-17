<template>
    <div class="modal fade modal-xl" id="TutoModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        aria-labelledby="TutoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title">
                        <div v-if="!isEdit">
                            <h5 class="" id="TutoModalLabel">Ajouter un tutoriel</h5>
                            <p class="mt-2" :title="stepTitle">Etape : {{ orderNbr }} </p>
                            <p>Pays : <span class="fw-bolder" :title="country.name">{{ country?.short_name }}</span> </p>
                        </div>

                        <div v-else>
                            <h5 class="mb-2" id="TutoModalLabel">Modifier un tutoriel</h5>
                            <p class="mt-2" :title="stepTitle">Ordre de tutoriel <b> {{ newTutoOrder }}</b> </p>
                        </div>
                    </div>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" @click="close"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <success-alert :show="isSucced" :response="msg">
                        <p>Votre action a été réalisée avec succès</p>
                    </success-alert>
                    <error-alert-2 :show="isError" :response="msg"></error-alert-2>
                    <form>
                        <div class="mb-3">
                            <label for="title" class="col-form-label"
                                :class="[v$.title.$error ? 'text-danger' : '']">Titre*</label>
                            <input type="text" class="form-control" id="title" v-model.trim="state.title"
                                :class="[v$.title.$error ? 'is-invalid' : '']">

                            <div class="invalid-feedback" v-if="v$.title.$error">
                                <span v-for="(error, index) of v$.title.$errors" :key="index">
                                    {{ error.$message }}
                                </span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="order" class="col-form-label"
                                :class="[v$.order.$error ? 'text-danger' : '']">Etape*</label>
                            <input class="form-control" ref="order" type="number"
                                :class="[v$.order.$error ? 'is-invalid' : '']" disabled :value="newTutoOrder">
                            <div class="invalid-feedback" v-if="v$.order.$error">
                                <span v-for="(error, index) of v$.order.$errors" :key="index">
                                    {{ error.$message }}
                                </span>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="desc" class="col-form-label">Description</label>
                            <textarea class="form-control" id="desc" v-model="state.description"></textarea>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                                @click="close">Fermer</button>
                            <submit-btn-component :loading="btnLoading" type="button" class="btn "
                                :class="!isEdit ? 'btn-success' : 'btn-warning'" @click="saveTuto">{{ isEdit ? 'Modifier'
                                    : 'Sauvegarder' }}</submit-btn-component>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue'
import customeMessage from '@/Utils/validationMessages'
import { computed, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import SuccessAlert from '@/components/shared/Alert/SuccessAlert.vue'
import ErrorAlert2 from '@/components/shared/Alert/ErrorAlert2.vue'
import { mapGetters } from 'vuex'
export default {

    watch: {
        selectedTuto(tutoToUpdate) {
            if (tutoToUpdate) {
                this.state.title = tutoToUpdate.title;
                this.state.order = tutoToUpdate.order;
                this.state.description = tutoToUpdate.description;
                this.state.id = tutoToUpdate.id;
            }
        },
    },
    data() {
        return {
            btnLoading: false,
            isSucced: false,
            isError: false,
            msg: '',
        }
    },

    computed: {
        ...mapGetters('tutorial', {
            selectedTuto: 'getSelectedTuto',
        }),
    },

    methods: {

        close() {
            this.isSucced = false;
            this.isError = false;
            this.v$.$reset();
            this.resetState();
            //reset selectTuto
            this.$store.commit('tutorial/selectTuto', null);
        },

        resetState() {
            this.state.title = '';
            this.state.description = ''
        },

        editTutorial() {

            this.$store.dispatch('tutorial/editTutorial', this.state).then((response) => {
                this.btnLoading = false;
                this.msg = response.data.status 
                this.isSucced = true;
                this.$emit("updatedTuto",response.data);

            }).catch((error) => {

                this.isSucced = false;
                this.isError = true,
                this.msg = error.message
                this.btnLoading = false
            })

            this.isSucced = false;
            this.isError = false;
        },

        saveTuto() {
            this.v$.$validate();
            if (this.v$.$error) {
                return;
            }

            this.btnLoading = true;

            if (this.isEdit) {
                return this.editTutorial();
            }

            this.state.step_id = this.stepId;
            this.state.order = this.$refs.order.value;

            this.$store.dispatch('tutorial/saveTuto', this.state).then((response) => {
                this.btnLoading = false;
                this.msg = response.data.status
                this.v$.$reset();
                this.resetState()
                this.isSucced = true;
                this.$emit("addedTuto",response.data);

            }).catch((error) => {
                this.isSucced = false;
                this.isError = true,
                    this.msg = error.message
                this.btnLoading = false
            })

            this.isSucced = false;
            this.isError = false;
        }
    },

    setup() {
        const state = reactive({
            title: '',
            description: '',
            order: 0,
            step_id: 0,
            id: 0
        })


        const rules = computed(() => {
            return {
                title: { required: customeMessage('title', 'required') },
                order: { required: customeMessage('order', 'required') }
            }
        })

        const v$ = useVuelidate(rules, state);
        return { state, v$ }
    },
    components: { SubmitBtnComponent, SuccessAlert, ErrorAlert2 },
    props: ['country', 'stepId', 'orderNbr', 'stepTitle', 'newTutoOrder', 'isEdit']
}
</script>
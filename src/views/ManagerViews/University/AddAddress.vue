<template>
    <div>
        <div class="jumbotron jumbotron-fluid">
            <div class="container m-md-5">
                <h2 class="text-success "> {{ title }} </h2>
                <div class="mt-4" v-if="!isEdit">
                    <p class="lead display-6">Université : <strong> {{ university.name }} <span v-if="university.shortName">
                                ({{ university.shortName }})</span></strong></p>
                </div>

                <div v-if="isEdit" class="mt-5">
                    <p>Pays : <span class="fw-bold">{{ adressToUpDate.city?.country.name }}</span> <img
                            :src="adressToUpDate.city?.country.flag_url" alt="drappeau pays" class="img-fluid mx-3"
                            width="35"> </p>
                    <p>Ville : <span class="fw-bold">{{ adressToUpDate.city.name }}</span> </p>

                </div>

            </div>
        </div>
        <form class="mx-5 my-5" novalidate v-on:submit.prevent="submit">
            <success-alert :show="isSucced" :response="msg">
                <p> 
                    <span v-if="!isEdit">  La sauvegarde de l'adresse a réussi !! </span> 
                    <span v-else> La modification de l'addresse a réussi ! <button type="button" @click="returnToBack" class="btn btn-dark">Retour</button> </span> 
                </p>

            </success-alert>
            <error-alert :show="isError" :response="msg"></error-alert>

            <div class="row mb-3">
                <div class="col col-12 col-md">
                    <label for="Adresse" :class="[v$.adress.$error ? 'text-danger' : '']">Adresse*</label>
                    <input type="text" class="form-control" id="Adresse" v-model.trim="state.adress"
                        :class="[v$.adress.$error ? 'is-invalid' : '']"
                        placeholder="Ex : Pauline Kabongo, 456 Avenue Lumumba ...">
                    <div class="invalid-feedback" v-if="v$.adress.$error">
                        <span v-for="(error, index) of v$.adress.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>

                <div class="col-12 col-md">
                    <label for="code_postal" :class="[v$.code_postal.$error ? 'text-danger' : '']">Code postal</label>
                    <input type="text" class="form-control" id="code_postal" maxlength="10"
                        :class="[v$.code_postal.$error ? 'is-invalid' : '']" v-model.trim="state.code_postal"
                        placeholder="Ex : 10100">
                    <div class="invalid-feedback" v-if="v$.code_postal.$error">
                        <span v-for="(error, index) of v$.code_postal.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="d-md-flex justify-content-between">

                <div>
                    <submit-btn-component class="btn btn-success m-2" type="submit" :loading="isLoading"
                        :disabled="!university.id && !isEdit" @click="save">Enregister</submit-btn-component>
                </div>

                <div>
                    <button class="btn btn-warning m-2" @click="resetState">Effacer</button> 
                    <button class="btn btn-outline-danger m-2" type="button" @click="returnToBack">Retour</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue'
import { computed, reactive } from 'vue'
import customeMessage from '@/Utils/validationMessages'
import useVuelidate from '@vuelidate/core'
import { mapGetters } from 'vuex'
import SuccessAlert from '@/components/shared/Alert/SuccessAlert.vue'
import ErrorAlert from '@/components/shared/Alert/ErrorAlert.vue'
import { navigateToRoute } from '@/Utils/Navigation'
export default {
    props: {
        adressToUpDate: {
            type: Object
        },
        isEdit: {
            type: Boolean,
            default: false
        },
        title: {
            default: 'Ajouter l\'adresse'
        }
    },
    methods: {

        handleUpdate(){

            this.isLoading = true;  
            this.state.university_id = this.adressToUpDate.id;
            this.$store.dispatch('universityManager/UpdateUniversityAdress', this.state).then((response) => {
                this.isSucced = true;
                this.v$.$reset();
                this.isLoading = false;
                this.msg = response.data.status

                this.$emit('updateAdress',response.data)

            }).catch((error) => {

                console.log(error)
                this.isLoading = false;
                this.isError = true;
                this.msg = error.response.data.errors; 
                this.isLoading = false;
                navigateToRoute.call(this, error.response.status, 'manager403');
            });

            this.isSucced = false;
            this.isError = false;
        },

        //when edit
        returnToBack(){
            if(this.isEdit){
               this.$emit('closeEditFormAdress');
            } 
         
        },

        save() {

            this.v$.$validate();
            if (this.v$.$error) {
                return;
            }

            if(this.isEdit){
                this.handleUpdate();
                return;
            }

            this.state.university_id = this.university.id;

            this.isLoading = true;
            this.$store.dispatch('universityManager/saveAddress', this.state).then((response) => {
                this.isSucced = true;
                this.v$.$reset();
                this.isLoading = false;
                this.msg = response.data.status

            }).catch((error) => {

                this.isError = true;
                this.msg = error.response.data.errors;
                this.isLoading = false;
                navigateToRoute.call(this, error.response.status, 'manager403');
            });

            this.isSucced = false;
            this.isError = false;

        },

        resetState() {
            for (let key in this.state) {
                this.state[key] = '';
            }
        },

    },
    mounted() {

        if (!this.university.id && !this.isEdit) {
            this.isError = true;
            this.msg = [["Veuillez sélectionner une université pour ajouter son adresse"]]
        }

        if (this.isEdit) {
            this.state.adress = this.adressToUpDate?.address?.adress;
            this.state.code_postal = this.adressToUpDate?.address?.code_postal;
        }
    },
    data() {
        return {
            isSucced: false,
            isLoading: false,
            msg: '',
            isError: false
        }
    },

    computed: {
        ...mapGetters('universityManager', {
            university: 'getUniversity'
        }),

    },

    setup() {
        const state = reactive({
            university_id: '',
            adress: '',
            code_postal: '',
        })
        const rules = computed(() => {
            return {
                adress: { required: customeMessage('address', 'required') },
                code_postal: { maxLength: customeMessage('code_postal', 'maxLength', 10) },
            }
        })

        const v$ = useVuelidate(rules, state);
        return { state, v$ }
    },

    components: { SubmitBtnComponent, SuccessAlert, ErrorAlert },

}
</script> 
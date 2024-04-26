<template>
    <form novalidate v-on:submit.prevent="submit">
        <RequestAlert :is-succeed="isRequestResponseSucceed" :response-message="requestResponse" v-if="isRequestResponseSucceed != null"></RequestAlert>
        <div class="row mb-3">
            <div class="form-group  col-md-6">
                <label for="pays" class="my-2 fw-bold" :class="[v$.country_id.$error && 'text-danger']">Pays*</label>
                <select class="form-select" id="pays" :class="[v$.country_id.$error && 'is-invalid']" v-model="state.country_id">
                    <option value="" v-if="!countries?.isFail" selected>Sélectionnez un pays</option>  
                    <option v-if="countries?.isFail">Une erreur s'est produite</option>  
                    <option v-else :value="item.id" v-for="(item,index) in countries" :key="index" :title="item.short_name">{{ item.name}}</option>  
                </select>

                <div class="invalid-feedback" v-if="v$.country_id.$error">
                    <span v-for="(error, index) of v$.country_id.$errors" :key="index">
                        {{ error.$message }}
                    </span>
                </div>
            </div>  
           <div class=" col-md-6 form-group">
                <label for="disciplines" class="my-2 fw-bold"
                    :class="[v$.service_disciplinaries.$error && 'text-danger']">Disciplines*</label>
                <select class="form-control" multiple="multiple" id="disciplines" :disabled="countries?.isFail || !getSectors(state.country_id)"
                    :class="[v$.service_disciplinaries.$error && 'is-invalid']" v-model="state.service_disciplinaries"> 
                    <option v-for="(item,index) in getSectors(state.country_id)" :key="index" :value="item.id">{{ item.label}}</option> 
                </select>

                <div class="text-danger" v-if="v$.service_disciplinaries.$error">
                    <span v-for="(error, index) of v$.service_disciplinaries.$errors" :key="index">
                        {{ error.$message }}
                    </span>
                </div>
            </div> 
        </div>

        <div class="row mb-3">
            <div class="form-group  col-md-6">
                <label for="Prix" class="my-2 fw-bold" :class="[v$.price.$error && 'text-danger']">Prix*</label>
                <input type="number" placeholder="Ex: 100.00" id="Prix" class="form-control" min="1" name="price"
                    :class="[v$.price.$error && 'is-invalid']" v-model.number="state.price">

                <div class="invalid-feedback" v-if="v$.price.$error">
                    <span v-for="(error, index) of v$.price.$errors" :key="index">
                        {{ error.$message }}
                    </span>
                </div>
            </div>

            <div class=" col-md-6 form-group">
                <label for="annee" class="my-2 fw-bold" :class="[v$.year.$error && 'text-danger']">Année*</label>
                <input type="text" placeholder="Ex: 2022" id="annee" class="form-control"  @focus="updateYear"
                    :class="[v$.year.$error && 'is-invalid']" v-model="state.year" autocomplete="off">
                <div class="invalid-feedback" v-if="v$.year.$error">
                    <span v-for="(error, index) of v$.year.$errors" :key="index">
                        {{ error.$message }}
                    </span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="modal-footer">
                <button class="btn btn-secondary" @click="cancel">Annuler</button>
                <SubmitBtnComponent :loading="isLoading" class="btn btn-success" @click="submitForm">Enregistrer
                </SubmitBtnComponent>
            </div>

        </div>
    </form>
</template>
<script>
import { ServiceModel } from '@/model/ServiceModel';
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';
import { computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import customeMessage from '@/Utils/validationMessages';
import messageFr from '@/lang/fr.json';
import errorMessage from '@/Utils/ErrorMessage';
import RequestAlert from '@/components/shared/Alert/RequestAlert.vue';


export default {
    props: {
        isCloseModal: {
            type: Boolean
        },

    },

    watch: {
        isCloseModal() {
            this.isRequestResponseSucceed = null;
            this.resetForm();
        }, 
    }, 
    data() {
        return {
            isLoading: false,
            countries : null, 
            requestResponse : '',
            isRequestResponseSucceed : null
        }
    },
    methods: {

        updateYear(event) {
        this.state.year = event.target.value;
    },

        getSectors(idCountry) {
            if (idCountry)
                return this.countries.find(country => country.id === idCountry).disciplinaries;
        },

    cancel(){
        this.isSucceed=null;
        this.resetForm();        
        this.$emit('closeModal') ;
    },

    resetForm()
    {
        this.v$.$reset();
        Object.assign(this.state,{...ServiceModel}); 
    },


        submitForm() {
           
            this.v$.$validate();

            if (this.v$.$error) {
                return;
            }
            
            this.isLoading = true;
            this.$store.dispatch('serviceManager/addService',this.prepareData())
            .then((response) =>
            { 
                this.isRequestResponseSucceed = true;
                this.requestResponse =  messageFr.messageRequest.success.save;
                this.resetForm();

            }).catch((error)=> {

                this.isRequestResponseSucceed = false;              
                this.requestResponse = errorMessage(error);

            }).finally(()=>{
                this.isLoading = false;
            })
        },
        //To store
        prepareData(){
           return {
            ...this.state,
            service_disciplinaries : this.state.service_disciplinaries.join(',')
           }
        },

        getCountries() {
            this.$store.dispatch('countryManager/countries').then((response) => {
               this.countries = response.data
            }).catch(()=> {
                this.countries = {
                    isFail : true
                }
            });
        }
    },

    mounted() {
       $('#annee').datepicker({
            format: "yyyy",
            viewMode: "years",
            minViewMode: "years",
            startDate: new Date(),
            forceParse : true
        })
        this.getCountries();
    },
    setup() {
        const state = reactive({
            ...ServiceModel
        });
        const rules = computed(() => {
            return {
                year: { required: customeMessage('year', 'required'), integer: customeMessage('year', 'integer') },
                price: { required: customeMessage('price', 'required') },
                service_disciplinaries: { required: customeMessage('service_disciplinaries', 'required') },
                country_id: { required: customeMessage('country_id', 'required') }
            }
        })
        const v$ = useVuelidate(rules, state);
        return { state, v$ }
    },

    components: { SubmitBtnComponent,RequestAlert },

    }
</script>
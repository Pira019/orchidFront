<template>
    <div> 
        <error-modal-component v-if="unexpectedError"></error-modal-component>
        <form novalidate v-on:submit.prevent="onsubmit">
            <div class="form-group row">
                <label for="country" class="col-sm-2 col-form-label fw-bold">Selectionner le pays*</label>
                <div class="col-sm-4 mb-3">
                    <select class="form-select" id="country" :class="[v$.country.$error ? 'is-invalid' : '']" v-model="state.country">
                        <option  value="" disabled>Selectionner un pays</option>
                        <option v-for="country in listOfCoutries" :key="country.id" :value="country">{{ country.name }}</option>
                    </select>
                    <div class="invalid-feedback" v-if="v$.country.$error">
                        <span v-for="(error, index) of v$.country.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
                <div class="col-sm-4">
                    <SubmitBtnComponent class="btn btn-success" @click="submit">Continuer</SubmitBtnComponent>
                </div>

            </div>
        </form>
    </div>
</template>
<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';
import CountryStepsService from '@/Services/Manager/CountryStepsService';
import ErrorModalComponent from '@/components/modal/ErrorModalComponent.vue';
import { computed, reactive } from 'vue';
import customeMessage from '@/Utils/validationMessages';
import useVuelidate from '@vuelidate/core'; 
import { mapGetters } from 'vuex';

export default {
    methods: {
        submit() {
            this.v$.$validate();
            this.$store.commit('countryStep/setSelectedCoutry', this.state)
            if (!this.v$.$error) {
                this.$router.push({ name: 'ManagerAddTutorielSteps' });
            }
        }
    },

    computed: {
        ...mapGetters('countryStep', {
            countrySelected: 'getCountrySelected'
        }),
    },
    name: "CountryFormTuto",
    components: { SubmitBtnComponent },


    data() {
        return {
            listOfCoutries: '',
            unexpectedError: false,
        }
    },

    setup() {
        const state = reactive({
            country: ''
        })

        const rules = computed(() => {
            return {
                country: { required: customeMessage('country', 'required') }
            }
        })

        const v$ = useVuelidate(rules, state);
        return { state, v$ }
    },

    created() {
        CountryStepsService.getListCountries().then((countries) => {
            this.listOfCoutries = countries.data;
        }).catch(() => {
            this.unexpectedError = true;
        });

         //set Page title
         this.$store.commit('tutorial/setHeaderTitle',"Ajouter les procédures générales par pays");  

        if (this.countrySelected)
            this.state.country = this.countrySelected
    },
    components: { SubmitBtnComponent, ErrorModalComponent },
}
</script>  
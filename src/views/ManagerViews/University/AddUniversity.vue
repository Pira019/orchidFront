<template>
    <div>
        <h2 class="m-5 text-success">{{ title }}</h2>
        <form class="mx-5 my-5" novalidate v-on:submit.prevent="submit">
            <success-alert :show="isSucced" :response="msg">
                <p> 
                    <span v-if="!isEdit"> La sauvegarde de l'université a réussi ! </span> 
                    <span v-else> La modification de l'université a réussi ! <button type="button" @click="returnToBack" class="btn btn-dark">Retour</button> </span> 
                </p>
                <a @click="addAddress" class="btn btn-success" title="Ajouter une address" v-if="!isEdit">Ajouter l'addresse de
                    l'université</a>
            </success-alert>
            <error-alert :show="isError" :response="msg"></error-alert>
            <div class="row mb-3" id="place">
                <div class="col-12 col-md">
                    <label for="pays" :class="[v$.country_id.$error ? 'text-danger' : '']">Pays*</label>
                    <select class="form-select" id="pays" v-model.number="state.country_id" @change="loadCities"
                        :class="[v$.country_id.$error ? 'is-invalid' : '']">
                        <option selected value="">Choisir un pays...</option>
                        <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}
                        </option>
                    </select>
                    <div class="invalid-feedback" v-if="v$.country_id.$error">
                        <span v-for="(error, index) of v$.country_id.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
                <div class="col-12 col-md" v-if="isOtherCity">
                    <label for="VilleAutre" :class="[v$.city_name.$error ? 'text-danger' : '']">Ville*</label>
                    <input type="text" id="VilleAutre" class="form-control" placeholder="Ex: Paris, Rabat , Montréal"
                        v-model="city" name="VilleAutre" :class="[v$.city_name.$error ? 'is-invalid' : '']">
                    <div class="invalid-feedback" v-if="v$.city_name.$error">
                        <span v-for="(error, index) of v$.city_name.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>

                <div class="col" v-if="!isOtherCity">
                    <label for="Ville" :class="[v$.city_name.$error ? 'text-danger' : '']">Ville*</label>
                    <select class="form-select" id="Ville" :class="[v$.city_name.$error ? 'is-invalid' : '']"
                        v-model="state.city_name" @change="showCityInput">
                        <option selected value="">Choisir ville ...</option>
                        <option v-for="city in cities" :key="city.id" :value="city.name">{{ city.name }}</option>
                        <option value="other_">Autre</option>
                    </select>
                    <div class="invalid-feedback" v-if="v$.city_name.$error">
                        <span v-for="(error, index) of v$.city_name.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col col-12 col-md">
                    <label for="university" :class="[v$.name.$error ? 'text-danger' : '']">Nom université*</label>
                    <input type="text" class="form-control" id="university" maxlength="255" v-model.trim="state.name"
                        :class="[v$.name.$error ? 'is-invalid' : '']"
                        placeholder="Ex : Université de montréal, Université de kinshasa ...">
                    <div class="invalid-feedback" v-if="v$.name.$error">
                        <span v-for="(error, index) of v$.name.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
                <div class="col-12 col-md">
                    <label for="sigle">En sigle</label>
                    <input type="text" class="form-control" style="text-transform:uppercase;" id="sigle"
                        placeholder="Ex : UQO, UNIKIN" v-model.trim="state.shortName">
                </div>

                <div class="col-12 col-md">
                    <label for="url" :class="[v$.webSite.$error ? 'text-danger' : '']">Site web*</label>
                    <input type="url" class="form-control" id="url" :class="[v$.webSite.$error ? 'is-invalid' : '']"
                        v-model.trim="state.webSite" placeholder="Ex : https://www.orchid-campus.com/">
                    <div class="invalid-feedback" v-if="v$.webSite.$error">
                        <span v-for="(error, index) of v$.webSite.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <label for="university" :class="[v$.name.$error ? 'text-danger' : '']">Pourquoi étudier cette université/college ?* </label>
                <textarea class="form-control m-2" cols="30" rows="5"></textarea>
            </div>

            <div class="d-flex justify-content-between">

                <div>
                    <submit-btn-component class="btn btn-success m-2" type="submit" :loading="isLoading" @click="save"> {{
                        !isEdit ? 'Enregistrer' : 'Modifier' }}</submit-btn-component>
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
        universityToUpDate: {
            type: Object
        },
        isEdit: {
            type: Boolean
        },
        title: {
            default: 'Ajouter une université'
        }
    },
    methods: {

        //when edit
        returnToBack(){
            if(this.isEdit){
               this.$emit('closeEditForm');
            } 
         
        },

        addAddress() {
            this.$store.commit('universityManager/setUniversity', this.university);
            this.$router.push({ name: 'ManagerUniversiteAddAddress' });
        },

        save() {

            if (this.isOtherCity) {
                this.state.city_name = this.city;
            }

            this.v$.$validate();
            if (this.v$.$error) {
                return;
            }
            this.isLoading = true;

            if (this.isEdit) {
                this.hadleUpdate();
                return;
            }

            this.$store.dispatch('universityManager/saveUniversity', this.state).then((response) => {
                this.university = response.data
                this.isSucced = true;
                this.v$.$reset();
                this.resetState();
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
            this.city = '';
        },

        loadCities() {
            this.isOtherCity = false;
            this.state.city_name = '';
            this.city = ''
            if (!this.state.country_id) {
                return;
            }
            this.$store.dispatch('country/getCities', this.state.country_id).then((response) => {
                this.cities = response.data;
            });
        },

        showCityInput() {
            if (this.state.city_name === 'other_') {
                this.isOtherCity = true;
            }

        },

        hadleUpdate() {
            this.$store.dispatch('universityManager/UpdateUniversity', this.state).then((response) => {
                this.isSucced = true;
                this.isLoading = false;
                this.msg = response.data.status;
                this.$emit('updateUniversity',response.data)

            }).catch((error) => {

                this.isError = true;
                this.msg = error.response.data.errors;
                this.isLoading = false;
                navigateToRoute.call(this, error.response.status, 'manager403');
            });

            
            this.isSucced = false;
            this.isError = false
        },

        initDataUpdateInform() {

            this.state.country_id = this.universityToUpDate.city.country.id;
            this.loadCities();
            this.state.city_name = this.universityToUpDate.city.name;
            this.state.name = this.universityToUpDate.name;
            this.state.shortName = this.universityToUpDate.shortName;
            this.state.webSite = this.universityToUpDate.webSite;
            this.state.id = this.universityToUpDate.id;
        },

    },

    created() {
        this.$store.dispatch('country/getCoutries');
    },



    mounted() {
        if (this.isEdit) {
            this.initDataUpdateInform();
        }

    },
    data() {
        return {
            isOtherCity: false,
            city: '',
            cities: [],
            isSucced: false,
            isLoading: false,
            msg: '',
            isError: false,
            university: ''
        }
    },

    computed: {
        ...mapGetters('country', {
            countries: 'getCountries',
        }),
    },

    setup() {
        const state = reactive({
            name: '',
            shortName: '',
            city_name: '',
            country_id: '',
            webSite: '',
            id: ''
        })
        const rules = computed(() => {
            return {
                country_id: { required: customeMessage('country', 'required') },
                city_name: { required: customeMessage('city', 'required') },
                name: { required: customeMessage('name_universiry', 'required') },
                webSite: { required: customeMessage('webSite', 'required'), url: customeMessage('', 'url') },
            }
        })


        const v$ = useVuelidate(rules, state);
        return { state, v$ }
    },

    components: { SubmitBtnComponent, SuccessAlert, ErrorAlert },

}
</script> 
<template>
    <form novalidate v-on:submit.prevent="onsubmit" id="form">
        <error-modal-component v-if="unexpectedError"></error-modal-component>
        <div>
            <div class="row mb-3 no-gutter">
                <div class="col form-group">
                    <label for="first_name" class="  mb-1">Prénom*</label>
                    <input type="text" id="first_name" class="form-control rounded-0" maxlength="255" autocomplete="family-name"
                        name="first_name" :class="[v$.user.first_name.$error ? 'is-invalid' : '']"
                        v-model.trim="state.user.first_name" placeholder="Prénom*" title="Prénom*" required>
                    <div class="invalid-feedback" v-if="v$.user.first_name.$error">
                        <span v-for="(error, index) of v$.user.first_name.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
                <div class="col form-group">
                    <label for="name" class="  mb-1">Nom*</label>
                    <input type="text" class="form-control rounded-0" id="name" name="name" maxlength="255" autocomplete="family-name"
                        :class="[v$.user.name.$error ? 'is-invalid' : '']" v-model.trim="state.user.name" placeholder="Nom*"
                        title="Nom*" required>
                    <div class="invalid-feedback" v-if="v$.user.name.$error">
                        <span v-for="(error, index) of v$.user.name.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col form-group">
                    <label for="sex" class="  mb-1">Sexe*</label>
                    <select class="form-select form-control rounded-0" id="sex" autocomplete="sex" name="sex"
                        :class="[v$.user.sex.$error ? 'is-invalid' : '']" v-model="state.user.sex" title="Sexe*" required>
                        <option selected value="">Sexe * ...</option>
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                    </select>
                    <div class="invalid-feedback" v-if="v$.user.sex.$error">
                        <span v-for="(error, index) of v$.user.sex.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
                <div class="col form-group">
                    <label for="birth_date" class="  mb-1">Date de naissance*</label>
                    <input type="date" id="birth_date" class="form-control rounded-0" :max="minDate_" placeholder="Date de naissance *" :class="[v$.user.birth_date.$error ? 'is-invalid' : '']" v-model="state.user.birth_date"
                        title="Date de naissance*">
                    <div class="invalid-feedback" v-if="v$.user.birth_date.$error">
                        <span v-for="(index) of v$.user.birth_date.$errors" :key="index">
                            {{customMessageMinDate()}}
                        </span>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col form-group">
                    <label for="residence_contry" class="  mb-1">Pays de résidence*</label>
                    <select class="form-select form-control rounded-0" id="residence_contry" name="country" autocomplete="on"
                        :class="[v$.user.residence_contry.$error ? 'is-invalid' : '']" v-model="state.user.residence_contry"
                        title="Pays de résidence *">
                        <option selected value="">Pays de résidence *...</option>
                        <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}
                        </option>
                    </select>
                    <div class="invalid-feedback" v-if="v$.user.residence_contry.$error">
                        <span v-for="(error, index) of v$.user.residence_contry.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
                <div class="col form-group">
                    <label for="citizenship" class="  mb-1">Pays de la citoyenneté*</label>
                    <select class="form-select form-control rounded-0" id="citizenship" name="citizenship" autocomplete="on"
                        :class="[v$.user.citizenship.$error ? 'is-invalid' : '']" title="Pays de citoyenneté *"
                        v-model="state.user.citizenship">
                        <option selected value="">Pays de la citoyenneté *...</option>
                        <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}
                        </option>
                    </select>
                    <div class="invalid-feedback" v-if="v$.user.citizenship.$error">
                        <span v-for="(error, index) of v$.user.citizenship.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col form-group">
                    <label for="phone" class="  mb-1">Téléphone</label>
                    <input type="tel" id="phone" :class="[v$.user.phone.$error ? 'is-invalid' : '']" name="tel" autocomplete="tel" v-mask="'(###) ###-###-###'"
                        title="Numéro téléphone" class="form-control rounded-0" v-model.trim="state.user.phone"
                        placeholder="Téléphone">
                    <div class="invalid-feedback" v-if="v$.user.phone.$error">
                        <span v-for="(error, index) of v$.user.phone.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col form-group">
                    <label for="email" class="  mb-1">Email*</label>
                    <input type="email" id="email" class="form-control rounded-0" autocomplete="email" name="email"
                        placeholder="Email*" title="Email*" :class="[v$.user.email.$error ? 'is-invalid' : '']"
                        v-model.lazy="state.user.email" required>
                    <div class="invalid-feedback" v-if="v$.user.email.$error">
                        <span v-for="(error, index) of v$.user.email.$errors" :key="index" class="d-block">
                            {{ error.$message}}
                        </span> 
                    </div>                    
                </div>
            </div>

            <div class="row mb-3 input-group">
                <div class="col form-group">
                    <label for="password" class="mb-1">Mot de passe*</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text p-2 rounded-0"  @click="togglePasswordVisibility(1)" id="password"><font-awesome-icon :icon="showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash '"  class="m-1" size="1x"></font-awesome-icon></span>
                         </div>
                         <input :type="showPassword ? 'text' : 'password'" id="password" class="form-control rounded-0" autocomplete="off"
                        :class="[v$.user.password.$error ? 'is-invalid' : '']" v-model="state.user.password"
                        placeholder="Mot de passe *" title="Mot de passe *" required>
                        <div class="invalid-feedback" v-if="v$.user.password.$error">
                            <span v-for="(error, index) of v$.user.password.$errors" :key="index" class="d-block">
                                {{ error.$message }}
                            </span>
                        </div>
                     </div>

                 </div>  

                <div class="col form-group">
                    <label for="password_confirmation" class="mb-1">Confirmer le mot de passe*</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text p-2 rounded-0"  @click="togglePasswordVisibility(2)" id="password"><font-awesome-icon :icon="showPasswordConfirm ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash '"  class="m-1" size="1x"></font-awesome-icon></span>
                        </div>
                        <input  :type="showPasswordConfirm ? 'text' : 'password'" id="password_confirmation" class="form-control rounded-0" required autocomplete="off"
                        :class="[v$.user.password_confirmation.$error ? 'is-invalid' : '']"
                        v-model="state.user.password_confirmation" placeholder="Confirmer le mot de passe *"
                        title="Confirmer le mot de passe*">
                        <div class="invalid-feedback" v-if="v$.user.password_confirmation.$error">
                        <span class="d-block">
                            {{ customMessageConfirmPassword() }}
                        </span>
                    </div>
                    </div>             
                   
                </div>
                
            </div>             
            <div class="row">
                <div class="col">
                    <!--start component recaptcha-->
                    <recaptcha-component @recaptcha="getToken"></recaptcha-component>
                     <!--end component recaptcha-->
                    <SubmitBtnComponent :loading="loading" @click="submitForm" class="btn btn-success mt-2">Créer mon compte</SubmitBtnComponent>
                </div>
            </div>
        </div> 
    </form>
</template>
<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';
import { required,sameAs, maxLength,helpers} from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core';
import { computed,reactive } from 'vue';
import { mapGetters, useStore } from 'vuex';
import ModalComponent from '@/components/modal/ModalComponent.vue';
import ErrorModalComponent from '@/components/modal/ErrorModalComponent.vue';
import {mask} from 'vue-the-mask'
import RecaptchaComponent from '@/components/shared/RecaptchaComponent.vue';
import minDate from '@/Utils/Date';
import goodPassword from '@/Utils/CustomValidation'
import customMessage from '@/Utils/validationMessages' 
import ErrorService from '@/Services/ErrorService';

export default {
    directives : {mask},
    setup() {
        const state = reactive({
            user: computed(() => useStore().state.user.User),
        })
        const rules = computed(() => {
            return {
                user: {
                    name: {maxLength: maxLength(255),required:customMessage("name",'required')},
                    first_name: {maxLength: maxLength(255),required:customMessage("first_name",'required')},
                    sex: { required, maxLength: maxLength(2),required:customMessage("sex",'required')},
                    birth_date: {minValue: (value) => { return new Date(value) <= new Date(minDate())}},
                    residence_contry: {required:customMessage("residence_contry",'required') }, 
                    citizenship: { required,required:customMessage("citizenship",'required')},
                    email: {required:customMessage("email",'required'),email:customMessage("email",'email')},
                    phone: {},
                    password: {goodPassword:(password) => { return goodPassword(password)},goodPassword: helpers.withMessage(customMessage("password","goodPassword"), goodPassword)},
                    password_confirmation: { sameAs: sameAs(state.user.password)},
                    recaptcha : {}
                }

            }

        });

        const v$ = useVuelidate(rules, state)
        return {
            state,
            v$
        }
    },
    data() {
        return {
            loading: false,
            minDate_:minDate(),
            unexpectedError: '',
            errors:[],
            showPassword : false,
            showPasswordConfirm : false,
            messageErrorRecaptcha : customMessage("","recaptcha"),
            recaptcha:'',
            formFieldsCopy:{}
        }
    },

    computed: {
        ...mapGetters('country', {
            countries: 'getCountries'
        }),
 
    },
    created() {
        this.getCountries();
        if(this.$store.getters['user/getEmail']?.length !== 0){
            this.$store.commit('user/setEmail','')  
        }
    },
    methods: {
        togglePasswordVisibility(toggleNumber){
       toggleNumber==1 ? this.showPassword=!this.showPassword : this.showPasswordConfirm=!this.showPasswordConfirm;
    },
        customMessageMinDate(){
            return 'L\'âge minimum requis est de 15 ans. Veuillez entrer une valeur inférieur ou égale à '+ this.minDate_;
        },
        customMessageConfirmPassword(){
            return 'La confirmation du mot de passe ne correspond pas';
        },

        getToken(recaptchaToken) {
            this.recaptcha = recaptchaToken

            },
             
        getCountries() {
            this.$store.dispatch('country/getCoutries'); 
        },

        submitForm() {   

            this.errors = this.recaptcha.length === 0 ? this.errors=[[this.messageErrorRecaptcha]] : [];
            this.v$.$validate(); 

            if(this.recaptcha.length === 0){
                this.$emit('handleFormErrors',this.errors);
            }

            if (this.errors.length === 0 && !this.v$.$error) {
                this.loading = true;
                 //put recaptcha value
                 this.$store.commit('user/setRecaptcha',this.recaptcha) 
                // call fonction save user
                this.$store.dispatch('user/saveUser', this.state.user).then(()=> {  
                
                this.errors=[];          
                //set for showing a modal
                this.$store.commit('setIsSucceed',true) 
                this.$store.commit('user/resetState')  
                this.loading=false;                
                this.$router.push('/login');

                }).catch((error) => { 
                  // this.handleFormErrors(error.response.status,error.response.data.errors) 
                   let error_ = ErrorService.handleErrorHttp(error.response?.status, error.response?.data.errors || [[error.response?.data]]);
                   if (!error_) {
                        this.unexpectedError = true;
                    }

                    this.errors = error_?.errorMessage;
                    this.loading = false;
                    this.$emit('handleFormErrors',this.errors);
                   
                }); 
            }

            this.recaptcha= '';
            this.unexpectedError=false;
            grecaptcha.reset()
        },

        mounted() {
            
        },
    },
    name: "RegisterForm",
    components: { SubmitBtnComponent, ModalComponent, RecaptchaComponent,ErrorModalComponent }
}
</script>
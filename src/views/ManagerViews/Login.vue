<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <div class="mb-4">
                    <img :src="logo" alt="" class="img-thumbnail mx-auto d-block mb-4" width="100">
                    <h1 class="text-success text-center">Bienvenue sur Orchid-Campus</h1>
                </div>
                <error-modal-component v-if="unexpectedError"></error-modal-component>
                <error-alert :show="showAlertErrors && this.errors?.length !== 0 && !unexpectedError" :response="errors"></error-alert>
                <div class="alert alert-danger" role="alert" v-if="error401 && !showAlertErrors">
                    <error-message-text></error-message-text>
                </div>
                <form novalidate v-on:submit.prevent="submit">
                    <div class="mb-3">
                        <label for="noId" class="form-label">No indentification</label>
                        <input type="text" class="form-control" name="user_name" v-model.trim="state.user_name"
                            :class="[v$.user_name.$error ? 'is-invalid' : '']">
                        <div class="invalid-feedback" v-if="v$.user_name.$error">
                            <span v-for="(error, index) of v$.user_name.$errors" :key="index">
                                {{ error.$message }}
                            </span>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Mot de passe</label>
                        <input type="password" class="form-control" name="password"
                            v-model="state.password" :class="[v$.password.$error ? 'is-invalid' : '']">
                        <div class="invalid-feedback" v-if="v$.password.$error">
                            <span v-for="(error, index) of v$.password.$errors" :key="index">
                                {{ error.$message }}
                            </span>
                        </div>
                    </div>

                    <div>
                        <a href="">Mot de passe oublié ou prémiere connexion ?</a>
                    </div>
                    <div id="recaptcha" class="mt-2">
                        <recaptcha-component @recaptcha="getReCAPTCHAToken"></recaptcha-component>
                    </div>
                    <div class="mt-2">
                        <SubmitBtnComponent class="btn btn-success" :loading="loadingBtn" @click="submit">Connecter</SubmitBtnComponent>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';
import logoOrchid from '@/assets/img/svg/logoOrchidGreen.svg';
import RecaptchaComponent from '@/components/shared/RecaptchaComponent.vue';
import { reactive } from 'vue';
import customeMessage from '@/Utils/validationMessages';
import useVuelidate from '@vuelidate/core';
import ErrorAlert from '@/components/shared/Alert/ErrorAlert.vue';
import ErrorModalComponent from '@/components/modal/ErrorModalComponent.vue';
import ErrorService from '@/Services/ErrorService';
import { mapGetters } from 'vuex';
import ErrorMessageText from '@/components/managerComponents/ErrorMessage.vue';
export default { 
    methods: {
        submit() {
            this.errors = this.recaptcha.length === 0 ? this.errors = [[this.messageErrorRecaptcha]] : [];
            this.v$.$validate();

            if (this.errors.length === 0 && !this.v$.$error) {
                
                this.loadingBtn = true; 
                this.state.recaptcha = this.recaptcha;

                this.$store.dispatch("authManager/authentication", this.state).then((response) => {

                    this.loadingBtn = false;   
                    
                    this.$store.commit('authManager/userAuth',{token : response.data.access_token, name : response.data.name });

                    this.$router.push({name:'managerHome'});

                }).catch((error) => {

                    this.showAlertErrors = true;
                    let error_ = ErrorService.handleErrorHttp(error.response?.status, error.response?.data.errors || [[error.response?.data]]);

                    if (!error_) {
                        this.unexpectedError = true;
                    }
                    this.errors = error_?.errorMessage;
                    this.loadingBtn = false;

                    
                    grecaptcha.reset()
                    
            
                })
            } else {
                this.showAlertErrors = true
            }

            this.unexpectedError = false;  

        },

        getReCAPTCHAToken(token) {
            this.recaptcha = token;
        },

        handle401Event(){
            this.showAlertErrors = true;
        }
    }, 
    data() {
        return {
            logo: logoOrchid,
            loadingBtn: false,
            messageErrorRecaptcha: customeMessage("", "recaptcha"),
            showAlertErrors: false,
            errors: [],
            unexpectedError: false,
            recaptcha: '', 
        }
    },
    setup() {
        const state = reactive({
            user_name: '',
            password: '',
            recaptcha: ''
        })

        const rules = {
            user_name: { required: customeMessage("user-name", 'required') },
            password: { required: customeMessage("password", 'required') },
            recaptcha: {}
        }
        const v$ = useVuelidate(rules, state);
        return { state, v$ }
    },

    computed: {
        ...mapGetters({
            error401: 'getError'
        })
    },
    components: { SubmitBtnComponent, RecaptchaComponent, ErrorAlert, ErrorModalComponent, ErrorMessageText, ErrorMessageText }
}
</script>,
        
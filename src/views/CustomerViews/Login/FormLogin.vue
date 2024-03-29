<template>
    <div>
        <div>
            <h1 class="text-success">Bienvenue</h1>
            <h5>Veuillez vous connecter ou <router-link :to="{ name: 'register' }" class="text-decoration-none font-weight-bold text-success">Créer un compte?</router-link></h5>
        </div>
        <div class="mt-5">
            <error-modal-component v-if="unexpectedError"></error-modal-component>
            <error-alert :show="showAlertErrors && this.errors?.length !== 0 && !unexpectedError"
                :response="errors"></error-alert>
            <form novalidate v-on:submit.prevent="onsubmit" ref="formLogin">
                <div class="form-group input-group-lg mb-3 col-10">
                    <label for="email" class="my-1 fw-bold">Email</label>
                    <input type="email" autocomplete="email" v-model.trim="state.email" name="email"
                        :class="[v$.email.$error ? 'is-invalid' : '']" class="form-control rounded-0" id="email"
                        aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Entrer votre email">
                    <div class="invalid-feedback" v-if="v$.email.$error">
                        <span v-for="(error, index) of v$.email.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
                <div class="mb-3 col-10">
                    <label for="password" class="my-1 fw-bold">Mot de passe</label>
                    <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                            <span class="input-group-text p-2 rounded-0" @click="togglePasswordVisibility"
                                id="password"><font-awesome-icon
                                    :icon="showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
                                    size="2x"></font-awesome-icon></span>
                        </div>
                        <input :type="showPassword ? 'text' : 'password'" :class="[v$.password.$error ? 'is-invalid' : '']"
                            autocomplete="off" v-model="state.password" class="form-control rounded-0" id="password"
                            aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="**********">
                        <div class="invalid-feedback" v-if="v$.password.$error">
                            <span v-for="(error, index) of v$.password.$errors" :key="index">
                                {{ error.$message }}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <recaptcha-component @recaptcha="geTreCAPTCHAToken"></recaptcha-component>
                </div>
                <div class="form-group mb-3 col-10 d-lg-flex justify-content-between">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="flexCheck">
                        <label class="form-check-label" for="flexCheck">
                            Se souvenir
                        </label>
                    </div>
                    <div>
                        <router-link :to="{ name: 'forgot-password' }"
                            class="text-decoration-none font-weight-bold text-success">Mot de passe oublié ?</router-link>
                    </div>
                </div>
                <input type="hidden" v-model="state.reCAPTCHAToken">
                <div class="form-group input-group-lg mb-3 col-10">
                    <submit-btn-component class="btn btn-success" :loading="loadingBtn" @click="submitForm()">Se
                        connecter</submit-btn-component>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue'
import RecaptchaComponent from '@/components/shared/RecaptchaComponent.vue'
import { useVuelidate } from '@vuelidate/core'
import { reactive } from 'vue'
import ErrorAlert from '@/components/shared/Alert/ErrorAlert.vue'
import customMessage from '@/Utils/validationMessages'
import ErrorService from '@/Services/ErrorService';
import ErrorModalComponent from '@/components/modal/ErrorModalComponent.vue';
export default {
    props: {
        //email when user asked to reset email
        emailReset: {
            default: '',
            type: String
        }
    },

    setup() {
        const state = reactive({
            email: '',
            password: '',
            recaptcha: ''
        })

        const rules = {
            email: { required: customMessage("email", 'required'), email: customMessage("email", 'email') },
            password: { required: customMessage("password", 'required') },
            recaptcha: {}
        }
        const v$ = useVuelidate(rules, state);
        return { state, v$ }
    },
    methods: {
        submitForm() {

            this.errors = this.recaptcha.length === 0 ? this.errors = [[this.messageErrorRecaptcha]] : [];
            this.v$.$validate();
            if (this.errors.length === 0 && !this.v$.$error) {
                this.loadingBtn = true;
                this.state.recaptcha = this.recaptcha;
                // call action to authentificate the user
                this.$store.dispatch('user/authentificate', this.state).then(() => {
                    //reset form
                    this.state = { ...this.formFieldsCopy }
                    this.loadingBtn = false;

                }).catch((error) => {
                    this.showAlertErrors = true
                    let error_ = ErrorService.handleErrorHttp(error.response?.status, error.response?.data.errors || [[error.response?.data]]);

                    if (!error_) {
                        this.unexpectedError = true;
                    }
                    this.errors = error_?.errorMessage;
                    this.loadingBtn = false;
                })

            } else {
                this.showAlertErrors = true
            }

            this.recaptcha = '';
            this.unexpectedError=false;
            grecaptcha.reset()
        },
        geTreCAPTCHAToken(token) {
            this.recaptcha = token;
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword
        }
    },

    mounted() {
        this.formFieldsCopy = { ...this.state };
        this.state.email = this.emailReset;
    },
    data() {
        return {
            showPassword: false,
            recaptcha: '',
            errors: [],
            messageErrorRecaptcha: customMessage("", "recaptcha"),
            showAlertErrors: false,
            loadingBtn: false,
            formFieldsCopy: {},
            unexpectedError: ''
        }
    },
    components: { SubmitBtnComponent, RecaptchaComponent, ErrorAlert,ErrorModalComponent },
    name: 'FormLogin'
}
</script>
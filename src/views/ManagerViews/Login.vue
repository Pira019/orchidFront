<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <div class="mb-4">
                    <img :src="logo" alt="" class="img-thumbnail mx-auto d-block mb-4" width="100">
                    <h1 class="text-success text-center">Bienvenue sur Orchid-Campus</h1>
                </div>
                <error-alert :show="showAlertErrors" :response="errors"></error-alert>
                <form novalidate v-on:submit.prevent="submit">
                    <div class="mb-3">
                        <label for="noId" class="form-label">No indentification</label>
                        <input type="text" class="form-control" id="noId" name="user_name" v-model.trim="state.user_name"
                            :class="[v$.user_name.$error ? 'is-invalid' : '']">
                        <div class="invalid-feedback" v-if="v$.password.$error">
                            <span v-for="(error, index) of v$.password.$errors" :key="index">
                                {{ error.$message }}
                            </span>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Mot de passe</label>
                        <input type="password" class="form-control" id="password" name="password"
                            v-model.trim="state.password" :class="[v$.password.$error ? 'is-invalid' : '']">
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
                        <SubmitBtnComponent class="btn btn-success" @click="submit">Connecter</SubmitBtnComponent>
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
export default {
    methods: {
        submit() {
            this.errors = this.state.recaptcha.length === 0 ? this.errors = [[this.messageErrorRecaptcha]] : [];
            this.v$.$validate();
            if (this.errors.length === 0 && !this.v$.$error) {
                this.loadingBtn = true;
                this.showAlertErrors = false;
                console.log(this.state)
            }else{
                this.showAlertErrors =true
            }

            this.state.recaptcha='';

        },

        getReCAPTCHAToken(token) {
            this.state.recaptcha = token;            
           // grecaptcha.reset()
        },
    },
    data() {
        return {
            logo: logoOrchid,
            loadingBtn: false,
            messageErrorRecaptcha: customeMessage("", "recaptcha"),
            showAlertErrors:false,
            errors:[]
        }
    },
    setup() {
        const state = reactive({
            user_name: '',
            password: '',
            recaptcha: ''
        })

        const rules = {
            user_name: { required: customeMessage("", 'required') },
            password: { required: customeMessage("", 'required') },
            recaptcha: {}
        }
        const v$ = useVuelidate(rules, state);
        return { state, v$ }
    },
    components: { SubmitBtnComponent, RecaptchaComponent, ErrorAlert }
}
</script>,
        
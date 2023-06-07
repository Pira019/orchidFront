<template>  
        <error-alert :show="showAlertErrors && this.errors?.length !== 0 && !unexpectedError" :response="errors" class="text-center"></error-alert>
        <error-modal-component v-if="unexpectedError"></error-modal-component>
       <SuccessAlert :show="isEmailSend" :response="response" class="text-center"> Confirmation de réception de votre message</SuccessAlert>
    <!--Grid row -->
    <div class="row justify-content-around m-5">
        <!--Grid column-->
        <div class="col col-md-6 mb-3 order-2">
            <form class="group-form" v-on:submit.prevent="onsubmit" novalidate ref="form">
                <div class="input-group mb-3">
                    <input type="text" required class="form-control rounded-0" aria-label="Large" name="name" autocomplete="family-name" :class="[v$.name.$error ? 'is-invalid' : '']"  v-model.trim="state.name"
                        aria-describedby="inputGroup-sizing-sm" placeholder="Nom *">
                    <div class="invalid-feedback" v-if="v$.name.$error">
                        <span v-for="(error, index) of v$.name.$errors" :key="index" class="d-block">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
                <div class="form-group mb-3">
                    <input type="email" v-model.trim="state.email" class="form-control rounded-0" name="email" :class="[v$.email.$error ? 'is-invalid' : '']" autocomplete="email"
                        aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Votre email *">
                     <div class="invalid-feedback" v-if="v$.email.$error">
                        <span v-for="(error, index) of v$.email.$errors" :key="index" class="d-block">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
                <div class="mb-3">
                    <textarea class="form-control" v-model.trim="state.message" :class="[v$.message.$error ? 'is-invalid' : '']"  required rows="3" placeholder="Votre message *"></textarea>
                        <div class="invalid-feedback" v-if="v$.message.$error">
                            <span v-for="(error, index) of v$.message.$errors" :key="index" class="d-block">
                                {{ error.$message }}
                            </span>
                        </div>
                </div>
                <div class="mb-3">
                    <recaptcha-component @recaptcha="getReCAPTCHAToken"></recaptcha-component>
                </div>
                <div class="mb-3">
                    <submit-btn-component class="btn btn-success" :loading="btnSubmitLoading"
                        @click="submitForm"></submit-btn-component>
                </div>
            </form>
        </div>
        <!--Grid column-->

        <!--Contact-->
        <div class="col col-md-auto col-sm-12 col-xs-12 order-1 mb-5">
            <div class="d-flex flex-column">
                <p class="h3 mb-3">Nos contacts</p>
                <div class="p-2" v-for="(contact, index) in contactList" :key="index">
                    <a :href="contact.link ?? '#'" id="contacts" target="_blank"
                        class="text-decoration-none text-black font-weight-bold"><font-awesome-icon
                            :icon="[contact.prefix, contact.icon]"
                            class="me-3 fa-2xl text-success"></font-awesome-icon>{{ contact.content }}</a>
                </div>
            </div>
        </div>
        <!--End contact-->

        <!--End Grid row -->
    </div> 
 
</template>
<script>
import contacts from "../shared/footer/footerLinks.json"
import { computed, reactive } from 'vue'
import RecaptchaComponent from '../shared/RecaptchaComponent.vue'
import useVuelidate from '@vuelidate/core'
import SubmitBtnComponent from "../shared/SubmitBtnComponent.vue"
import customeMessage from "@/Utils/validationMessages"
import ErrorAlert from '../shared/Alert/ErrorAlert.vue'
import ErrorService from "@/Services/ErrorService"
import SuccessAlert from '@/components/shared/Alert/SuccessAlert.vue'
import ErrorModalComponent from '../modal/ErrorModalComponent.vue'
export default {
    methods: {
        getReCAPTCHAToken(token) {
            this.state.recaptcha = token;
        },

        resetForm(){
            this.state.email=''
            this.state.name=''
            this.state.recaptcha=''
            this.state.message=''
        },
        submitForm() {    

           this.errors = this.state.recaptcha.length === 0 ? this.errors = [[this.messageErrorRecaptcha]] : [];
            this.v$.$validate();

            if (this.errors.length === 0 && !this.v$.$error) {
                this.btnSubmitLoading = true;
                
                this.$store.dispatch('contact/question',this.state).then(()=>{
                    this.btnSubmitLoading=false;

                    this.isEmailSend=true; 
                     this.resetForm()
                    grecaptcha.reset();  
                     

                }).catch((error)=>{
                    this.btnSubmitLoading=false;
                    let errors_ = ErrorService.handleErrorHttp(error.response?.status,error.response?.data.errors);

                    if(!errors_){
                            this.unexpectedError=true;  
                        }
                    this.isEmailSend=false;    
                    this.errors=errors_?.errorMessage;
                    this.showAlertErrors=true;   
                    
                    this.state.recaptcha=''
                    grecaptcha.reset();   
                })

            } else {
                this.isEmailSend=false;    
                this.showAlertErrors = true;
            }

            this.unexpectedError = false;
        }
    },
    components: { RecaptchaComponent, SubmitBtnComponent, ErrorAlert, ErrorModalComponent , SuccessAlert}, 
    setup() {
        const state = reactive({
            name: '',
            email: '',
            message: '',
            recaptcha: '',
        })

        const rules = computed(() => {
            return {
                name:  {required:customeMessage("name",'required')},
                email:  {required:customeMessage("email",'required'),email:customeMessage("email",'email')},
                recaptcha: '',
                message: {required:customeMessage("message",'required')},
            }
        })
        const v$ = useVuelidate(rules, state)
        return { state, v$ };
    },
    data() {
        return {
            contactList: contacts.contact,
            btnSubmitLoading: false,
            showAlertErrors: false,
            unexpectedError: false,
            errors: [],
            initialForm:{},
            isEmailSend:false,
            response:customeMessage("", "success"),
            messageErrorRecaptcha: customeMessage("", "recaptcha"),
        }
    },
  
    name: "ContactFormComponent"
}
</script>

<style scoped>#contacts:hover {
    color: #00874E !important;
}</style> 
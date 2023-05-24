<template>
    <div class="col-md-6 offset-md-3">
        <error-modal-component v-if="unexpectedError"></error-modal-component> 
        <ErrorAlert :show="showAlertErrors && this.errors?.length !== 0 && !unexpectedError" :response="errors"/>
       <form novalidate v-on:submit.prevent="onsubmit">
            <div class="form-group col-10 mb-3">
                <label for="email" class="my-1 fw-bold">Email</label>
                <input type="email" autocomplete="email" name="email" :class="[v$.email.$error ? 'is-invalid' : '']" class="form-control" v-model.trim="state.email" id="email" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Entrer votre email"> 
                <div class="invalid-feedback" v-if="v$.email.$error">
                        <span v-for="(error, index) of v$.email.$errors" :key="index" class="d-block">
                            {{ error.$message }}
                        </span>
                    </div>
            </div>

            <div class="form-group col-10 mb-3">
                <label for="password" class="my-1 fw-bold">Nouveau mot de passe</label>
                <div  class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text p-2 rounded-0"  @click="togglePasswordVisibility(1)" id="password"><font-awesome-icon :icon="showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash '"  class="m-1" size="1x"></font-awesome-icon></span>
                    </div>
                    <input :type="showPassword ? 'text' : 'password'" autocomplete="off" v-model="state.password" :class="[v$.password.$error ? 'is-invalid' : '']" class="form-control" id="password" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Entrer votre nouveau mot de passe"> 
                    <div class="invalid-feedback" v-if="v$.password.$error" >
                        <span v-for="(error, index) of v$.password.$errors" :key="index" class="d-block">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
                 
            </div>

            <div class="form-group col-10 mb-3 ">
                <label for="confirmPassword" class="my-1 fw-bold">Confirmer mot de passe</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text p-2 rounded-0"  @click="togglePasswordVisibility(2)" id="password"><font-awesome-icon :icon="showPasswordConfirm ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash '"  class="m-1" size="1x"></font-awesome-icon></span>
                    </div>
                   <input :type="showPasswordConfirm ? 'text' : 'password'" v-model="state.password_confirmation" autocomplete="off" :class="[v$.password_confirmation.$error ? 'is-invalid' : '']" class="form-control" id="confirmPassword" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Confirmer le mot de passe"> 
                   <div class="invalid-feedback" v-if="v$.password_confirmation.$error">
                        <span class="d-block">
                            {{ customMessageConfirmPassword() }}
                        </span>
              </div> 
                </div>              
            </div>
            <div class="mb-3">
                <recaptcha-component @recaptcha="getReCAPTCHAToken"></recaptcha-component>
            </div>
            <div class="mb-3">
               <SubmitBtnComponent class="btn btn-success" :loading="loadingBtn" @click="submitForm"/>
            </div>
       </form>
    </div>
</template>

<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue'
import { computed, reactive } from 'vue';
import customMessage from '@/Utils/validationMessages'
import useVuelidate from '@vuelidate/core';
import goodPassword from '@/Utils/CustomValidation'
import { helpers, sameAs } from '@vuelidate/validators';
import RecaptchaComponent from '@/components/shared/RecaptchaComponent.vue' 
import ErrorAlert from '@/components/shared/Alert/ErrorAlert.vue'
import ErrorService from '@/Services/ErrorService';
import ErrorModalComponent from '@/components/modal/ErrorModalComponent.vue';

export default{
  data () {
    return {
        showPassword : false,
        showPasswordConfirm : false,
        showAlertErrors:false,
        errors:[],
        formFieldsCopy :{},        
        response : '',
        unexpectedError:false,
        loadingBtn : false,
        messageErrorRecaptcha : customMessage("","recaptcha"),
    }
  },
    setup() {
    const state = reactive({
        email : '',
        password: '',
        password_confirmation:'',
        recaptcha:'',
        token:''
    })

    const rules = computed(() => {
        return {
        email : {required:customMessage("email",'required'),email:customMessage("email",'email')},
        password: {goodPassword:(password) => { return goodPassword(password)},goodPassword: helpers.withMessage(customMessage("password","goodPassword"), goodPassword)},
        password_confirmation: { sameAs : sameAs(state.password)},
        recaptcha : {}
    }
    })
    const v$ = useVuelidate(rules,state);
    return {state,v$}
  },
  
  methods:{
   shareResponseToModal(response){
     //set for showing a modal info
     this.$store.commit('setIsSucceed',true) 
     this.$store.commit('setResponse',response) 
   },

    submitForm(){
        this.errors = this.state.recaptcha.length === 0 ? this.errors=[[this.messageErrorRecaptcha]] : [];  
       this.v$.$validate();        
        if(this.errors.length === 0 && !this.v$.$error){            
            this.loadingBtn=true;
            this.$store.dispatch('user/updatePassword',this.state).then((response)=>{
                this.errors=[]
                this.state={...this.formFieldsCopy}
                this.loadingBtn=false; 

                this.shareResponseToModal(response.data)    
                this.$router.push('/login');

            }).catch((error)=> {

                this.loadingBtn=false;
                let errors_ = ErrorService.handleErrorHttp(error.response?.status,error.response?.data.errors || [[error.response?.data]]);
                
                if(!errors_){
                this.unexpectedError=true;  
            }  
                this.errors=errors_?.errorMessage;
                this.showAlertErrors=true;                            
                
            });
            grecaptcha.reset();  
        }else{
            this.showAlertErrors=true;
        }
        grecaptcha.reset();      
        this.state.recaptcha=''
        this.unexpectedError=false;
    },

    togglePasswordVisibility(toggleNumber){
       toggleNumber==1 ? this.showPassword=!this.showPassword : this.showPasswordConfirm=!this.showPasswordConfirm;
    },

    getReCAPTCHAToken(token){
        this.state.recaptcha=token;
    },

    customMessageConfirmPassword(){
            return 'La confirmation du mot de passe ne correspond pas';
        },
  },

  mounted(){
    this.formFieldsCopy={...this.state}
    this.state.token=this.$route.query.token; // get token to reset password 
  },
    components: { SubmitBtnComponent,RecaptchaComponent,ErrorAlert,ErrorModalComponent},
    name : 'FormUpdatePassword'

}</script>
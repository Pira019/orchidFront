<template>
   <div class="container">
    <div class="text-center">
        <h1 class="text-success">Récupération de mot de passe oublié</h1>
        <p class="lead">Si vous avez oublié votre mot de passe, ne vous inquiétez pas, nous sommes là pour vous aider à le réinitialiser et à regagner l'accès à votre compte.</p>
    </div>

    <div class="col-md-6 offset-md-3">
       <ErrorAlert :show="showAlertErrors && this.errors?.length !== 0" :response="errors"/>
        <form novalidate v-on:submit.prevent="onsubmit" ref="passwordForgot">
            <div class="form-group input-group-lg mt-4">
                    <label for="email" class="col-sm-2 col-form-label fw-bold">Email:</label>
                    <div class="col-sm-10">
                        <input type="email" autocomplete="email" v-model.trim="state.email" :class="[v$.email.$error ? 'is-invalid' : '']" name="email"  class="form-control rounded-0" id="email" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Entrer votre email">                     
                       
                        <div class="invalid-feedback" v-if="v$.email.$error">
                        <span v-for="(error, index) of v$.email.$errors" :key="index">
                            {{ error.$message }}
                        </span> 
                    </div>
                   
                    </div>
                  
            </div>                  
        </form>
      
            <submit-btn-component class="btn btn-success mt-3" :loading="loadingBtn" @click="submitForm"></submit-btn-component>       
    </div>

    <div class="row mt-5">
   <p class="text-justify text-center mt-3">Si vous rencontrez des difficultés lors de la récupération de votre mot de passe ou si vous avez d'autres questions, n'hésitez pas à contacter <router-link :to="{name:'contact'}" class="text-decoration-none font-weight-bold text-success">notre équipe d'assistance</router-link> . Nous sommes là pour vous aider à résoudre tout problème et à vous assurer un accès facile à votre compte.</p>
    </div>
</div>
</template>

<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue'
import ErrorAlert from '@/components/shared/Alert/ErrorAlert.vue'
import customMessage from '@/Utils/validationMessages'
import { reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import ErrorService from '@/Services/ErrorService'
export default {
    setup(){
        const state = reactive({
            email :''
        })

        const rules = {
            email : {required:customMessage("email",'required'),email:customMessage("email",'email')},
        }

        const v$ = useVuelidate(rules,state);
        
        return {state,v$}
    },
  data () {
    return {
        errors:[],
        recaptcha:'',
        loadingBtn : false,
        formFieldsCopy :{},
        showAlertErrors:false
    }
  },

  methods :{
    submitForm(){
        this.v$.$validate(); 
        
        if(!this.v$.$error){
        this.loadingBtn=true;
        this.$store.dispatch('user/forgotPassword',this.state).then(()=>{           
            this.state={...this.formFieldsCopy}  //reset form
            this.errors=[]
            this.loadingBtn = false;
        }).catch((error)=>{
            let errors_ = ErrorService.handleErrorHttp(error.response?.status,error.response?.data.errors || [[error.response?.data]]  );
            this.errors=errors_.errorMessage;
            this.showAlertErrors=true;
            this.loadingBtn=false;
        })
        }
    }
  },

  mounted(){
    this.formFieldsCopy={...this.state}
  },

    name:'ForgetPassword',
    components: { SubmitBtnComponent,ErrorAlert},
}
</script> 
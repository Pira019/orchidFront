<template> 
    <div class="container">
        <div class="text-center mb-5">
            <h1 class="text-success">Créer un compte</h1>
            <p>Étudier à l'étranger faites vos démarches de façon autonome, ! Veuillez remplir le formulaire ci-dessous pour créer votre compte</p>  
         <error-alert :show="showError" :response="errorsForm"></error-alert>
        </div>       
        <div class="row justify-content-around">
            <div class="col-md-6 p-5 d-sm-none d-none d-md-block" :style="imgRegister"  style="background-position: center;background-size: cover"></div>
            <register-form class="col col-md-6 mb-3" @handleFormErrors="display_error($event)" ></register-form> 
        </div> 
    </div>
</template>

<script>
import imgRegister from '@/assets/img/register.jpg';
import registerForm from './RegisterForm.vue';    
import ErrorAlert from '@/components/shared/Alert/ErrorAlert.vue';
export default{
  methods: {
    display_error(errors=null){
        if(errors){
        this.errorsForm=errors;
        this.showError=true; 
        }       
    },
    
   
  },

  computed:{
    
},
  components: { registerForm, ErrorAlert },
  data () {
    return {  
        imgRegister: { backgroundImage: `url('${imgRegister}')`} ,   
        showError:false,
        errorsForm : ''      
    }; 
  },
  
    name: 'Register'
}
</script>
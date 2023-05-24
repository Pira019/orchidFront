<template>
    <div class="container">
        <div class="row justify-content-around m-md-5">
            <FormLogin class="col col-md-6 mb-5" :email-reset="emailReset"></FormLogin>
            <div class="col-md-6 p-5 d-sm-none d-none d-md-block" :style="imgLogin" style="background-position: center;   background-size: cover">                
            </div>
        </div>   
        <register-success-modal-component  v-if="showSucceedModal">
          <p v-if="response">{{ response }}</p>
        <template #footer v-if="response">Vous pouvez maintenant vous connecter à votre compte en utilisant votre nouveau mot de passe</template>
        </register-success-modal-component> 
    </div>
</template>
<script>
import FormLogin from './FormLogin.vue';
import imgLogin from '@/assets/img/graduation.jpg';  
import RegisterSuccessModalComponent from '@/components/modal/RegisterSuccessModalComponent.vue';

export default  {
  created()
  {      
    this.emailReset = this.$store.getters['user/getEmail']; 
    //test and show the the modal if request is succeded else hide succeed modal     
    if(this.$store.getters.getState.isSucceed){

      this.showSucceedModal=true
      this.response=this.$store.getters.getState.response
      this.$store.commit('setIsSucceed',false)  

    }else{
      
     this.showSucceedModal=false; 
     this.response=false
    }   
  },

  data () {
    return { 
      imgLogin: { backgroundImage: `url('${imgLogin}')`},
      showSucceedModal : false,
      response:false,
      emailReset:'' // when user reset password
  };
  },
    name: "Login",
    components: { FormLogin,RegisterSuccessModalComponent }
}
</script>
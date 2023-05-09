<template>
    <div class="container">
        <div class="row justify-content-around m-md-5">
            <FormLogin class="col col-md-6 mb-5"></FormLogin>
            <div class="col-md-6 p-5 d-sm-none d-none d-md-block" :style="imgLogin" style="background-position: center;   background-size: cover">                
            </div>
        </div>   
        <register-success-modal-component  v-if="showSucceedModal"></register-success-modal-component> 
    </div>
</template>
<script>
import FormLogin from './FormLogin.vue';
import imgLogin from '@/assets/img/graduation.jpg';  
import { ModalTypeEnum } from '@/enums';
import RegisterSuccessModalComponent from '@/components/modal/RegisterSuccessModalComponent.vue';

export default  {
  created()
  { 
    //test and show the de modal if user is created else hide succeed modal     
    if(this.$store.getters.getState){
      this.showSucceedModal=true      
      this.$store.commit('setIsSucceed',false) 
      console.log(this.showSucceedModal)
    }else{
     this.showSucceedModal=false;
     console.log(this.showSucceedModal)
    }   
  },
  data () {
    return { 
      imgLogin: { backgroundImage: `url('${imgLogin}')`},
      showSucceedModal : false,
      typeModal : ModalTypeEnum.REGISTER
  };
  },
    name: "Login",
    components: { FormLogin,RegisterSuccessModalComponent }
}
</script>
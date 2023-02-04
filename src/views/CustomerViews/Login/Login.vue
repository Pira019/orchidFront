<template>
    <div class="container">
        <div class="row justify-content-around m-md-5">
            <FormLogin class="col col-md-6 mb-5"></FormLogin>
            <div class="col-md-6 p-5 d-sm-none d-none d-md-block" :style="imgLogin" style="background-position: center;   background-size: cover">                
            </div>
        </div>   
    </div>
</template>
<script>
import FormLogin from './FormLogin.vue';
import imgLogin from '@/assets/img/graduation.jpg';

export default  {
  data () {
    return { imgLogin: { backgroundImage: `url('${imgLogin}')`} };
  },
    name: "Login",
    components: { FormLogin }
}
</script>
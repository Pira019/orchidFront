<template> 
<div class="bg-success">
  <div class="container">
   <nav class="navbar navbar-expand-lg navbar-dark">
    <router-link to="/" class="navbar-brand">  <img :src="logoOrchid" alt="logo orchid campus" width="100"></router-link>      
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button> 
  <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item"> 
        <router-link class="nav-link" :to="{name:'about-us'}">Qui sommes-nous?</router-link> 
      </li>
      <li class="nav-item">
        <router-link :to="{name:'managerHome'}" class="nav-link" title="Questions populaires">Nos services</router-link>
      </li>  
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Destinations
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Canada</a>
          <a class="dropdown-item" href="#"> Maroc</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Procédures d'inscription</a>
        </div>
      </li>        
      <li class="nav-item">
        <router-link :to="{name:'faq'}" class="nav-link" title="Questions populaires">Faq</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :to="{name:'contact'}">Contact</router-link> 
      </li>
      <li class="nav-item">
        <button-component path="login">Inscriptions</button-component>
      </li> 
    </ul> 
    </div> 
   </nav>
  </div>
</div>
</template>

<script> 
import ButtonComponent from './ButtonComponent.vue';
import logo from '@/assets/img/logo-orchid-campus.png';
 

export default {
  data () {
    return {
      logoOrchid : logo
    }
  },
    name: "Menu",
    components: {ButtonComponent  }
}
</script>


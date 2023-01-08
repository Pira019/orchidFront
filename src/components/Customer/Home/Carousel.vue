<template>  
<!-- Background image -->
<div class="p-5" style="background-image: url('../../../src/assets/img/graduation-orchid-campus.jpg');  background-position: center;   background-size: cover"> 
     
    <div class="container text-white m-md-5 p-md-5">      
      <div class="row justify-content-md-center">
        <div class="col col-lg-8">
          <h1>Étudier à l'étranger <br> Faites vos démarches de façon autonome</h1>     
        </div> 
      </div>

      <div class="row justify-content-md-center">
        <div class="col col-lg-8">
          <p>Nous sommes conscients de l'importance de votre projet académique et que vous travaillerez sans aucun doute dur pour vous assurer que votre objectif d'étudier à l'étranger se réalise.</p>
     
          <ButtonComponent class="mx-1">Je veux une assistantace</ButtonComponent>
          <ButtonComponent :variantStyle="btnStyle" class="mx-1 my-2">En savoir plus</ButtonComponent>
        </div> 
      </div>       
      </div> 
  </div>
 
 
 
 
<!-- Background image -->
</template>

<script>
import ButtonComponent from '../../shared/Menu/ButtonComponent.vue';  
export default{
  data () {
    return {      
      btnStyle:'btn-light border border-warning', 
   
    }
  },
    name: "CarouselHome",
    components: { ButtonComponent }
    
}
</script>  
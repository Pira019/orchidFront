<template>
   <parent-component>
    <Carousel></Carousel>

    <div class="container">
      <h2 class="text-center">Nos valeurs</h2>
      <!--Our values-->
      <Our-values></Our-values>
    </div>
      <div class="bg-info text-center p-4 mb-4 mt-5">
        <div class="container">
          <p class="text-success">En parfaite conformité avec les lois des pays concernés, Orchid Campus propose des services d'assistance numérique. En plus des vidéos tutorielles que nous fournissons, nous proposons également un service d'accompagnement dont le but est la réalisation de votre projet académique plutôt que de gagner de l'argent.</p>
          <ButtonComponent :variantStyle="btnStyle">
         Tutoriel pour étudier à l'étranger
          </ButtonComponent>
        </div>
           </div>    
   </parent-component> 
</template>

<script>
import Carousel from '../../../components/Customer/Home/Carousel.vue';
import OurValues from '../../../components/Customer/Home/OurValues.vue'; 
import ButtonComponent from '../../../components/shared/Menu/ButtonComponent.vue';
import ParentComponent from '../../../components/shared/ParentComponent.vue'
 
export default{
  data () {
    return {
      btnStyle:'bg-success text-white'
    }
    
  }, 
  components: { ParentComponent, Carousel, OurValues, ButtonComponent },
 
    name : 'Home'
}
</script>
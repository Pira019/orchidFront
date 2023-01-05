<template>
   <parent-component>
    <Carousel></Carousel>

    <div class="container">
      <h2 class="text-center">Nos valeurs</h2>
      <!--Our values-->
      <Our-values></Our-values>
    </div>
      <div class="bg-secondary text-center p-4 mb-4 mt-4">
        <div class="container">
          <p>En parfaite conformité avec les lois des pays concernés, Orichid Campus propose des services d'assistance. En plus des vidéos tutorielles que nous fournissons, nous proposons également un service d'accompagnement dont le but est la réalisation de votre projet académique plutôt que de gagner de l'argent.</p>
          <ButtonComponent></ButtonComponent>
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
      nameApp :  {
        type : String,
        default : 10
      }
    }
  },

  mounted (){
    console.log(import.meta.env.APP_TITLE)
   // this.nameApp = import.meta.env.APP_TITLE
  },   
  
  components: { ParentComponent, Carousel, OurValues, ButtonComponent },
 
    name : 'Home'
}
</script>
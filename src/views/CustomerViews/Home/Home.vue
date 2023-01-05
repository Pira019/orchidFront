<template>
   <parent-component>
    <Carousel></Carousel>

    <div class="container">
      <h2 class="text-center">Nos valeurs</h2>
      <!--Our values-->
      <Our-values></Our-values>
    </div>
   </parent-component> 
</template>

<script>
import Carousel from '../../../components/Customer/Home/Carousel.vue';
import OurValues from '../../../components/Customer/Home/OurValues.vue';
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
  
  components: { ParentComponent, Carousel, OurValues },
 
    name : 'Home'
}
</script>
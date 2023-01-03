<template>
   <parent-component>
    <Carousel></Carousel>
   </parent-component> 
</template>

<script>
import Carousel from '../../../components/Customer/Home/Carousel.vue';
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
  
  components: { ParentComponent, Carousel },
 
    name : 'Home'
}
</script>
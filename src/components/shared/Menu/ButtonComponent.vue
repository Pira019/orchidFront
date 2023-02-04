<template >    
      <router-link class="btn border border-white" :to="{name:path}" :class="[variantStyle]" >
        <slot>
            Assistance
        </slot>
      </router-link>
</template>

<script>
export default{
  props : {
    variantStyle : {
      type:String,
      default: 'btn-warning'
    },
    path : {
      type: String, 
      default :'home'     
    }
  },
  methods: {
   /* btnColor(isMenu){
       this.test=isMenu;
    }*/
  },
  data () {
    return {
     //this.path:'';
    }
  },
  mounted(){
 //   console.log(this.test);
  },
    name: 'ButtonComponent'
}
</script>
<template >
    <button class="btn border border-white" :class="[variantStyle]">
        <slot>
            Assistance
        </slot>
    </button>
</template>

<script>
export default{
  props : {
    variantStyle : {
      type:String,
      default: 'btn-warning'
    }
  },
  methods: {
   /* btnColor(isMenu){
       this.test=isMenu;
    }*/
  },
  data () {
    return {
       
    }
  },
  mounted(){
 //   console.log(this.test);
  },
    name: 'ButtonComponent'
}
</script>
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
    name: 'ButtonComponent'
}
</script>
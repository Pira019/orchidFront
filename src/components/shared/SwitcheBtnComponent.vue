<template>
  <div class="form-check form-switch"> 
     <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" :checked="isCkecked"> 
</div>
</template>

<script>
export default {
  props:{
    isCkecked:{
        type:Boolean,
        default:false
    }
  }, 
    
}
</script>
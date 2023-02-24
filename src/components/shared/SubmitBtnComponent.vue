<template>
    <button type="submit" :disabled="disabled">
        <slot>Envoyer</slot>
    </button>
</template>

<script>
export default {
  props: {
    disabled : {
        type: Boolean,
        default : false
    }
  },
  data () {
    return {
        
    }
  },
    
    name :'BtnSubmit'
}
</script>
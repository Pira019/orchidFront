<template>
  <button :class="[classColor]" type="button" disabled>
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  Chargement...
</button>
</template>

<script>
export default {
    props : {         
        classColor : {
            type:String,
            default : 'btn btn-success'
        }
    },
    name : 'ButtonLoading'
}
</script>

<style>

</style>
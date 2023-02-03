<template>
    <VueRecaptcha
      :sitekey="siteKey"
      :load-recaptcha-script="true"
      @verify="handleSuccess"
      @error="handleError"
    ></VueRecaptcha>
  </template>

<script>
import { computed } from '@vue/runtime-core'
import { VueRecaptcha} from 'vue-recaptcha'
export default{
    components : {VueRecaptcha},
    setup(){
        const siteKey = computed(() => {
            return "6Lcm2z0kAAAAAJL-i0M_-FufN5qXLHlcru4TjYlv"
        });

    const handleError = () => {
      // Do some validation
    };

    const handleSuccess = (response) => {
     // Do some validation
    };

    return {
      handleSuccess,
      handleError,
      siteKey,
    };
    },
    name : 'RecaptchaComponent'

}
</script>
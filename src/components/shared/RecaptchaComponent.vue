<template> 
<vue-recaptcha
            :sitekey="sitekey"
            :loadRecaptchaScript="true"
            ref="recaptcha" 
            type="invisible"
            @verify="onCaptchaVerified"
            @expired="onCaptchaExpired"
          >
     </vue-recaptcha>
</template>

<script>
import {VueRecaptcha} from 'vue-recaptcha'  
export default{ 
  data () {
    return {
        sitekey : import.meta.env.VITE_RECAPTCHA_SITE_KEY
    }
  },
  methods: {
    onCaptchaExpired(){
        this.$refs.form.recaptcha.reset();
    },
    onCaptchaVerified(recaptchaToken){
        this.$emit('recaptcha',recaptchaToken) 
    }
  }, 
    components : {'vue-recaptcha' : VueRecaptcha}, 
}
</script>
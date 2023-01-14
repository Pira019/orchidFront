<template>
    <div class="container">
        <h1 class="text-center text-success">Faqs</h1> 
        <faq-component :faqs="contentFaqs" class="mt-5"></faq-component>

        <div class="text-center bg-info mt-5 mb-3 pt-3 pb-3">
          <h3 class="text-success">Vous avez encore des questions ?</h3>
          <p>Vous pouvez nous contacter <router-link class="text-reset" :to="{name:'contact'}">ici</router-link> </p>
        </div>
    </div>    
</template>

<script>
import FaqComponent from '@/components/Customer/FaqComponent.vue'
import content from '@/assets/contentText/contentPages.json'
export default{
  methods: {
  },
  methods: {
  },
  data () {
    return {
        contentFaqs : content.faqs
    }
  },
  components: { FaqComponent },
    name:"Faq"
}
</script>
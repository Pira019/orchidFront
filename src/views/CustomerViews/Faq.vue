<template>
    <div class="container mt-5 mb-5">
        <h1 class="text-center text-success">Faqs</h1> 
        <faq-component :faqs="contentFaqs" class="mt-5"></faq-component>
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
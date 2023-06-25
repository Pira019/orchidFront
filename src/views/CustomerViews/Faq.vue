<template>
    <div class="container">

        <h1 class="text-center text-success">Faqs</h1> 
        <h2 class="text-center h6 lead">Nous sommes là pour répondre à toutes vos questions concernant nos tutoriels et les démarches pour étudier à l'étranger. Consultez les questions fréquemment posées ci-dessous :</h2>
        <faq-component :faqs="contentFaqs" class="mt-5"></faq-component>

        <div class="text-center bg-info mt-5 mb-3 pt-3 pb-3">
          <h3 class="text-success">Souhaitez-vous poser d'autres questions ?</h3>
          <p>Vous pouvez nous contacter <router-link class="text-reset" :to="{name:'contact'}">ici</router-link> </p>
        </div>
    </div>    
</template>

<script>
import FaqComponent from '@/components/Customer/FaqComponent.vue'
import content from '@/assets/contentText/contentPages.json'
export default{ 
  data () {
    return {
        contentFaqs : content.faqs
    }
  },
  components: { FaqComponent },
    name:"Faq"
}
</script>
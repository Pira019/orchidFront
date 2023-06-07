<template>
    <div class="container">
        <h1 class="text-center text-success">Contact</h1>
        <div class="text-center">
          <h2 class="h6 lead">Nous sommes ravis de pouvoir vous aider et répondre à toutes vos questions.<br>
            <strong>S'il vous plaît n'hésitez pas à nous contacter.</strong> </h2>
        </div>
        <contact-form-component></contact-form-component>
    </div>
</template>

<script>
import ContactFormComponent from '@/components/Customer/ContactFormComponent.vue'
 
export default {
  components: { ContactFormComponent }, 
  data () {
    return {
        id:this.id
    }
  },
   
    name: "Contact"
}
</script>
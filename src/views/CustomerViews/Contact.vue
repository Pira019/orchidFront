<template>
    <div class="container">
        <h1 class="text-center text-success">Contact</h1>
        <div class="mt-5 text-center">
          <p>Avez-vous des questions ou avez-vous besoin d'informations supplémentaires? <br>
            <strong>S'il vous plaît n'hésitez pas à nous contacter.</strong> </p>
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
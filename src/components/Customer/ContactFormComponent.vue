<template>
    <!--Grid row -->    
    <div class="row justify-content-around m-5">
        <!--Grid column-->
        <div class="col col-md-6 col-sm col-xs-12 mb-3">
            <form class="group-form">
                <div class="input-group input-group-lg mb-3">    
                    <input type="text" required class="form-control rounded-0" name="name" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Nom *">
                </div>
                <div class="form-group input-group-lg mb-3">    
                    <input type="email" required class="form-control rounded-0" name="email" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Email *">
                </div> 
                <div class="mb-3">
                    <textarea class="form-control" required rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <recaptcha-component></recaptcha-component>
                </div>
                <div class="mb-3">
                    <button class="btn btn-success btn-lg" type="submit">Envoyer</button>
                </div>
          </form>
        </div>
    <!--Grid column-->

    <!--Grid column-->
     <div class="col col-md-auto col-sm-12 col-xs-12">
        <div class="d-flex flex-column">
        <div class="p-2" v-for="(contact,index) in contactList" :key="index">
           <a :href="contact.link ?? '#'" id="contacts" target="_blank" class="text-decoration-none text-black font-weight-bold"><font-awesome-icon :icon="[contact.prefix,contact.icon]" class="me-3 fa-2xl text-success"></font-awesome-icon>{{contact.content}}</a>
        </div>         
        </div>
    </div>
     <!--Grid column-->

    <!--End Grid row -->
    </div>

</template>
<script>
import contacts from "../shared/footer/footerLinks.json"
import RecaptchaComponent from '../shared/RecaptchaComponent.vue'
export default{
  components: { RecaptchaComponent },
  data () {
    return {
        contactList : contacts.contact
    }
  },
    name:"ContactFormComponent"
}
</script>

<style scoped>
#contacts:hover{
    color:#00874E !important;
}
</style> 
<template>
    <!--Grid row -->
    <div class="row mt-5 gx-5">
        <!--Grid column-->
        <div class="col-md-6 bg-success">
            <form class="group-form">
                <div class="input-group input-group-lg mb-3">    
                    <input type="text" required class="form-control rounded-0" name="_name" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Nom *">
                </div>
                <div class="form-group input-group-lg mb-3">    
                    <input type="email" required class="form-control rounded-0" name="email" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Email *">
                </div>
                <div class="mb-3">
                    <button class="btn btn-success btn-lg" type="submit">Envoyer</button>
                </div>
          </form>
        </div>
    <!--Grid column-->

    <!--Grid column-->
     <div class="col-md-6 bg-info">
        <div class="d-flex flex-column">
        <div class="p-2" v-for="(contact,index) in contactList" :key="index">
           <a href="" class="text-reset"><font-awesome-icon :icon="[contact.prefix,contact.icon]" class="me-3"></font-awesome-icon>{{contact.content}}</a>
        </div>         
        </div>
    </div>
     <!--Grid column-->

    <!--End Grid row -->
    </div>

</template>
<script>
import contacts from "../shared/footer/footerLinks.json"
export default{
  data () {
    return {
        contactList : contacts.contact
    }
  },
    name:"ContactFromComponent"
}
</script>
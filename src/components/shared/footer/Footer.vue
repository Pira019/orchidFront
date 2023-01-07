<template> 
       <!-- Footer -->
<div class=" text-lg-start bg-success text-white">
   
  <!-- Section: Links  -->
  <section class="p-4">
    <div class="container text-center text-md-start mt-5">
      <!-- Grid row -->
      <div class="row mt-3">
        <!-- Grid column -->
        <div class="col-md-4 col-lg-4 col-xl-3 mx-auto mb-4">
          <!-- Content -->
          <h6 class="text-uppercase fw-bold mb-4">
            <i class="fas fa-gem me-3"></i>Company name
          </h6>
          <p>
            Here you can use rows and columns to organize your footer content. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <!-- Grid column -->
        

        <!-- Grid column -->
        <div class="col-md-4 col-lg-2 col-xl-2 mx-auto mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4" >
            liens utiles
          </h6>
          <p v-for="(link,index) in footerLinks" :key="index">
            <a href="#!" class="text-decoration-none text-reset">{{link.title}}</a>
          </p> 
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">Contact</h6>           
          <p v-for="(contact,index) in contactLinks" :key="index">           
            <font-awesome-icon :icon="[contact.prefix,contact.icon]" class="me-3"></font-awesome-icon>
           <a href="#" class="text-decoration-none text-reset">{{contact.content}}</a>
          </p>
           </div>
        <!-- Grid column -->
      </div>
      <!-- Grid row -->
    </div>
  </section>
  <!-- Section: Links  -->

  <!-- Copyright -->
  <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
    © 2022 :
    <span class="text-reset fw-bold">Orchid-campus</span>
  </div>

<!-- Footer -->
    </div>
 
</template>

<script>
import footerLinks from "./footerLinks.json"
export default{
    name: 'Footer',   
    data() {   
      return {
        footerLinks : footerLinks.useFull,
        contactLinks : footerLinks.contact
      }
    },

    mounted(){     
      //this.links=useFullLinks;
      console.log(this.links)
    }
}
</script>

<style scoped>
.text-reset:hover{
  text-decoration: underline !important;
}
</style>
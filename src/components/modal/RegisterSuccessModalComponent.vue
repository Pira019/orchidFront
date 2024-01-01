<template>
    <!-- Modal success-->
    <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header m-3">            
            <font-awesome-icon v-if="isSuccess" icon="fa-circle-check" class="modal-title w-100 text-center text-success" size="3x" beat></font-awesome-icon>  
            <font-awesome-icon v-else icon="fa-solid fa-triangle-exclamation" class="modal-title w-100 text-center text-danger" size="3x" beat></font-awesome-icon>  
          </div>
          <div class="modal-body text-center border-0">
            <h5>
              <slot  v-if="isSuccess"> Félicitations ! Nous sommes ravis de vous compter parmi nous.</slot>
              <span v-else>Erreur {{ codeErreur }} s'est produite lors du traitement de votre demande </span>
            </h5> 
            <slot name="footer"></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">Fermer</button> 
          </div>
        </div>
      </div>
    </div>
</template>

<script> 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  props: {
    handleModal:{ default: true},
    isSuccess : {type:Boolean, default : true},
    codeErreur : {default: ''}
  },
  created() {
    //show the modal
    if (this.handleModal) {
      $(document).ready(function () {
        $("#successModal").modal('show');
      });
    }

  },
  methods: {
    close() {
      //hide the modal
      $(document).ready(function () {
        $("#successModal").modal('hide');
      });
    }
  }, 
    name: "RegisterSuccessModalComponent",
    components: { FontAwesomeIcon }
}
 
</script>
 
<template> <!-- Button trigger modal --> 
    <!-- Modal -->
    <div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="errorModal" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header m-3">            
            <font-awesome-icon icon="fa-solid fa-triangle-exclamation" class="modal-title w-100 text-center text-danger" size="3x" beat></font-awesome-icon>  
          </div>
          <div class="modal-body text-center border-0">
            <h5>Erreur inattendue</h5> 
            <p>Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">Fermer</button> 
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ModalTypeEnum } from '@/enums';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  created(){
    //show the modal
    $(document).ready(function(){
		$("#errorModal").modal('show');
	});
  },
  methods: { 
    close(){
      //hide the modal
    $(document).ready(function(){
		$("#errorModal").modal('hide');
	});
    }
  },
  data () {
    return {
      modalName : ModalTypeEnum.REGISTER
    }
  },
    name: "ErrorModalComponent",
    components: { FontAwesomeIcon }
}
 
</script>
 
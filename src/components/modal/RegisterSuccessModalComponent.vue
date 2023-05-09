<template> <!-- Button trigger modal --> 
    <!-- Modal -->
    <div class="modal fade" :id="modalName" tabindex="-1" role="dialog" :aria-labelledby="modalName" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header m-3">            
            <font-awesome-icon icon="fa-circle-check" class="modal-title w-100 text-center text-success" size="3x" beat></font-awesome-icon>  
          </div>
          <div class="modal-body text-center border-0">
            <h5>Félicitations ! Nous sommes ravis de vous compter parmi nous.</h5> 
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button> 
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
		$("#"+ ModalTypeEnum.REGISTER).modal('show');
	});
  },
  methods: { 
  },
  data () {
    return {
      modalName : ModalTypeEnum.REGISTER
    }
  },
    name: "RegisterSuccessModalComponent",
    components: { FontAwesomeIcon }
}
 
</script>
 
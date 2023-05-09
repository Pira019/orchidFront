<template>
  <success-modal-component v-if="modal == modalType.REGISTER"></success-modal-component>
</template>

<script>
import SuccessModalComponent from './RegisterSuccessModalComponent.vue'
import { ModalTypeEnum } from '@/enums';
export default {
  data () {
    return {
     modalType : ModalTypeEnum
    }
  },
  props: {
    modal : {
      type : String,
      default : ''
    }
  },
  components: { SuccessModalComponent },
    name : 'ModalComponent'
}
</script> 
 
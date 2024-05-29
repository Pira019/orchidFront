<template>
    <div>
        <StaticbackdropModal :isLoading="isRequestLoading" :btnConfirm="true" :title="modalTitle" :isConfirmModal="true"
            :closeModal="isModalClosed" @isConfirm="modalResponse" :modalId="'confirme'" :modalSize="'sm'"
            class="mt-sm-5">
            <slot> <p>Voulez-vous confirmer cette action?</p>  </slot>
           
        </StaticbackdropModal>
        <button class="btn btn-outline-success" @click="this.isModalClosed = false">
            <font-awesome-icon icon="fa-plus"></font-awesome-icon>
        </button>
    </div>
</template>

<script>
import StaticbackdropModal from './StaticbackdropModal.vue'
export default{

  props: {
    isRequestLoading:{
        default : false
    }, 
  },

     
  data () {
    return {
        isModalClosed : true,
        isConfirm : null, 
        modalTitle : "Confirmation", 
    }
  },
  
  methods: {
      modalResponse(isActionConfirm) {
          if (isActionConfirm) {
              return this.$emit("isModalConfirm", isActionConfirm)
          }

          this.$emit("isModalConfirm", isActionConfirm)
          this.isModalClosed = true;

          //  
      },
  
  },
    components: { StaticbackdropModal },

}
</script>


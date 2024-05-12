<template>
    <div>
        <StaticbackdropModal :btnConfirm="true" :title="modalTitle" :isConfirmModal="true" :closeModal="isModalClosed" @isConfirm="modalResponse" :modalId="'confirme'" :modalSize="'sm'" class="mt-sm-5">
            <p>Voulz-vous confirmer cette action?</p>
        </StaticbackdropModal>
        <button class="btn btn-outline-success" @click="this.isModalClosed = false">
            <font-awesome-icon icon="fa-plus"></font-awesome-icon>  
        </button>
    </div>
</template>

<script>
import StaticbackdropModal from './StaticbackdropModal.vue'
export default{

     
  data () {
    return {
        isModalClosed : true,
        isConfirm : null, 
        modalTitle : "Confirmation"
    }
  },
  
  methods: {
    modalResponse(res)
    {
        if(res)
        {
            this.$emit("isModalConfirm")
            return
        }
       
        this.isModalClosed = true;
    },
  
  },
    components: { StaticbackdropModal },

}
</script>


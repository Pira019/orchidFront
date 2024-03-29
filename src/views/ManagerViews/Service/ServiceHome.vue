<template> 
        <StaticbackdropModal :title="modalTitle" @isConfirm="handleModal" :is-confirm-modal="false" :close-modal="!isModalHidden" :modalSize="'modal-lg'" v-show="isModalHidden != null">
            <service-form-persistance @closeModal="isModalHidden=!true" :is-close-modal="isModalHidden"></service-form-persistance>
        </StaticbackdropModal>
       <button class="btn btn-success" @click="handlePersistanceBtn">Ajouter</button>     
</template>

<script>
import StaticbackdropModal from '@/components/modal/StaticbackdropModal.vue';
import PageTitle from '@/components/shared/Manager/PageTitle.vue';
import ServiceFormPersistance from './ServiceFormPersistance.vue';
import TextModal from '@/Utils/json/TextModal'

export default{
    
    methods: {

        handleModal() {           
            this.isModalHidden = false;
                },
        // when click in "Ajouter btn show modal"
        handlePersistanceBtn(isNew = true) {
            if (isNew) {
                this.modalTitle = TextModal.service.ajout;
                this.isModalHidden = true;
                return
            }
        }
    },
  data () {
    return {
        isModalHidden : null,
        modalTitle : null
    }
  },
    components: { PageTitle,StaticbackdropModal, ServiceFormPersistance},
}
</script>
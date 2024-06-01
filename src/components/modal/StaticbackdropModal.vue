<template>
    <!-- confirmation Modal -->
    <div class="modal fade" :id="modalId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        :aria-labelledby="modalId" aria-hidden="true">
        <div class="modal-dialog" :class="modalSize">
            <div class="modal-content"> 
                    <div class="modal-header">
                        <h5 class="modal-title attention-title" :id="modalId">{{  title }}</h5>
                        <button type="button" class="btn-close" @click="close(), $emit('isConfirm', false)"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <slot>
                        <p>Vous êtes sur le point de supprimer une étape</p>    
                        <p class="confirmation-message"> Cette action est irréversible. Êtes-vous sûr de vouloir continuer ? </p>                
                        </slot> 
                    </div>
                    <div class="modal-footer" v-if="isConfirmModal">
                        <button type="button" class="btn btn-secondary"
                            @click="close(), $emit('isConfirm', false)">Annuler</button> 
                        <submit-btn-component  class="btn" :class="!btnConfirm ? 'btn-danger' : 'btn-success' " :loading="isLoading" @click="$emit('isConfirm', true)">
                            {{!btnConfirm ? 'Supprimer' : 'Confirmer'  }}</submit-btn-component>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import SubmitBtnComponent from '../shared/SubmitBtnComponent.vue';
export default {
  components: { SubmitBtnComponent },
    props: {
        modalId: {
            default : "staticBackdrop"
        },
        btnConfirm: {
            default : false,
            type : Boolean
        },
        closeModal:{ type : Boolean},
        isConfirmModal:{ 
            default:true,
        },
        modalSize : {
            type:String         
        },
        title:{
            default: 'Confirmation de Suppression'
        }, 
        isLoading:{
            type : Boolean,
            default: false
        } 
  },
    watch: {
        closeModal(newValue) {

            newValue ? this.close() : this.showModal();

        }
    },
    methods: {
        close() { 

            this.$nextTick(function(){
                $("#"+this.modalId).modal('hide');
            })
        },

        showModal() {
            this.$nextTick(function(){
                $("#"+this.modalId).modal('show');
            }) 
        }
    },
}
</script>
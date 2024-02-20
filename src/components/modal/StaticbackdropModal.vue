<template>
    <!-- confirmation Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog" :class="modalSize">
            <div class="modal-content"> 
                    <div class="modal-header">
                        <h5 class="modal-title attention-title" id="staticBackdropLabel">{{  title }}</h5>
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
                        <submit-btn-component  class="btn btn-danger" :loading="isLoading" @click="$emit('isConfirm', true)">Supprimer</submit-btn-component>
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
        closeModal:{ type : Boolean},
        isConfirmModal:{ 
            default:true,
        },
        modalSize : {
            default : null
        },
        title:{
            default: 'Confirmation de Suppression'
        },
        subjet:{
            default: 'une étape'
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
            $(document).ready(function () {
                $("#staticBackdrop").modal('hide');
            });
        },

        showModal() {
            $(document).ready(function () {
                $("#staticBackdrop").modal('show');
            });
        }
    },
}
</script>
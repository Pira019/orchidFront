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
                        <button type="button" class="btn btn-danger" @click="$emit('isConfirm', true)">Supprimer</button>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
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
<template>
    <div>
        <form novalidate v-on:submit.prevent="submit">
            <div class="row mb-3">
                <div class="col-12 col-md">
                    <label for="sessionAdmission" class="my-2 fw-bold">Session d'admission*</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="printemps">
                        <label class="form-check-label" for="printemps">
                            Printemps
                        </label> 
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Eté" id="Eté">
                        <label class="form-check-label" for="Eté">
                            Eté
                        </label> 
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Automne" id="automne">
                        <label class="form-check-label" for="Automne">
                            Automne
                        </label> 
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Hiver" id="hiver">
                        <label class="form-check-label" for="Hiver">
                            Hiver
                        </label> 
                    </div>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-12 col-md">
                    <label for="Lien" class="my-2 fw-bold">Lien*</label>
                    <input type="url" id="Lien" class="form-control"  
                        placeholder="Ex: www.exemple.com" >

                </div>
            </div>
            <div class="row mb-2">
                <div class="col-12 col-md">
                    <label for="Type" class="my-2 fw-bold">Type*</label>
                    <input type="text" id="Type" class="form-control"   >

                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md">
                    <label for="debut" class="my-2 fw-bold">Début d'admission*</label>
                    <input type="date" id="debut" class="form-control">

                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md">
                    <label for="fin" class="my-2 fw-bold">Fin d'admission*</label>
                    <input type="date" id="fin" class="form-control">

                </div>
            </div>

            <div class="row">
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button">Annuler </button> 
                    <SubmitBtnComponent  class="btn btn-success">Enregistrer</SubmitBtnComponent>
                </div>

            </div>
        </form>
    </div>


</template>

<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';

export default {
    data() {
        return {
            isModalClosed: true
        }
    },
    components: { SubmitBtnComponent },
}
</script>
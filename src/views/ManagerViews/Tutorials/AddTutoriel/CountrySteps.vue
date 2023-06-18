<template>
    <div>
        <form>
            <div class="row">
                <div class="form-group col-sm-4">
                    <label for="Titre">Titre *</label>
                    <input type="text" id="Titre" class="form-control">
                </div>
                <div class="form-group col-sm-4">
                    <label for="stepNum">Numéro étape *</label>                     
                    <input type="number" min="1" class="form-control" id="stepNum" value="1">
                </div>
                <div class="form-group col-sm-4">
                    <label for="Description">Description</label>   
                    <textarea class="form-control" id="Description" rows="5"></textarea>
                </div>
                <div class="form-group mt-3">
                  <button class="btn btn-primary">Ajouter une étape</button>
                  <button class="btn btn-success mx-1">Enregister</button>
                </div>                           
            </div>
        </form>
    </div>
</template>
<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';

export default {
    components: { SubmitBtnComponent }
}
</script>

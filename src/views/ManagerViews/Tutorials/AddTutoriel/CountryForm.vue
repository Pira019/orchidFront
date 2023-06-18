<template>
    <div>
        <form>
            <div class="form-group row">
                <label for="conutry" class="col-sm-2 col-form-label fw-bold">Selectionner le pays</label>
                <div class="col-sm-4 mb-3">
                  <select class="form-select" id="conutry">
                    <option value="">TEST 1</option>
                    <option value="">TEST 145</option>
                  </select>
                </div>
                <div  class="col-sm-4">
                    <SubmitBtnComponent class="btn btn-success">Continuer</SubmitBtnComponent>
                </div>
              
            </div>
        </form>
    </div>
</template>
<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';

export default {
    name: "CountryFormTuto",
    components: { SubmitBtnComponent }
}
</script>

<template>
    <form novalidate v-on:submit.prevent="submit">
        <div class="row mb-3">
            <div class="form-group  col-md-6">
                <label for="Prix" class="my-2  fw-bold  fw-bold">Prix*</label>
                <input type="number"  placeholder="Ex: 100.00"  step="any" id="Prix" class="form-control" min="1">    
            </div>

            <div class=" col-md-6 form-group">
                <label for="annee" class="my-2  fw-bold  fw-bold">Année*</label>
                <input type="text"  placeholder="Ex: 2022"  id="annee" class="form-control">   
            </div>
        </div>
    </form>
</template>
<script> 
export default {
    mounted() {
        $('#annee').datepicker({
            format: "yyyy",
            viewMode: "years",
            startDate : new Date(),
            minViewMode: "years"
        });
    }

}
</script>

 
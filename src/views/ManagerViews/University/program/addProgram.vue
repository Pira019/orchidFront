<template>
    <div>
        <form class="my-5" novalidate v-on:submit.prevent="submit">
            <div class="row mb-3">
                <div class="col-12 col-md">
                    <label for="program_name" class="my-2  fw-bold  fw-bold">Programme*</label>
                    <input type="text" id="program_name" class="form-control" max="255">
                </div> 
            </div>

            <div class="row mb-3">
                <div class="col-12">
                    <label for="discipline_name" class="my-2  fw-bold">Secteur discipline*</label>
                    <input type="text" id="discipline_name" class="form-control" max="255"> 
                </div> 

                <div class="col-12">
                    <label for="discipline_description" class="my-2  fw-bold">Description du secteur</label>
                    <textarea type="text" id="discipline_description" class="form-control" ></textarea>
                </div> 

            </div>

            <div class="row mb-3">
                <div class="col-12 col-md">
                    <label for="nbrCredit" class="my-2  fw-bold">Nombre de crédit*</label>
                    <input type="number" id="nbrCredit" class="form-control">
                </div> 
            </div>

            <div class="row mb-3">
                <div class="col-12 col-md">
                    <label for="cycle" class="my-2  fw-bold fw-bold">Cycle*</label>
                    <input type="number"  min="1" max="4"  id="cycle" class="form-control">
                </div> 

                <div class="col-12 col-md">
                    <label for="duration" class="my-2  fw-bold fw-bold">Durée*</label>
                        <div class="row">
                            <input type="number" min="0" max="6" id="duration" class="form-control col mx-1">
                            <input type="number" id="duration" class="form-control col">
                        </div>
                  
                </div> 
            </div>

            <div class="row mb-3" title="Langue d'enseignement">
                <div class="col-12 col-md">
                    <label for="languages" class="my-2  fw-bold">Langue(s)*</label>
                    <input type="number" id="languages" class="form-control">
                </div> 
            </div>

            <div class="row mb-3">
                <div class="col-12 col-md">
                    <label for="admission_scheme" class="my-2  fw-bold">Shema d'admission*</label>
                    <input type="type" id="admission_scheme" class="form-control">
                </div> 
            </div> 

        </form>
        
    </div>
</template>

<script>
export default{}
</script>
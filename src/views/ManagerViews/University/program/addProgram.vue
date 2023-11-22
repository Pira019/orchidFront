<template>
    <div>
        <form class="my-5" novalidate v-on:submit.prevent="submit">
            <div class="row mb-3">
                <div class="col-12 col-md">
                    <label for="program_name" class="my-2  fw-bold  fw-bold">Programme*</label>
                    <input type="text" id="program_name" class="form-control" max="255" v-model.trim ="state.program_name">
                </div> 
            </div>

            <div class="row mb-3">
                <div class="col-12">
                    <label for="discipline_name" class="my-2  fw-bold">Secteur discipline*</label>
                    <input type="text" id="discipline_name" class="form-control" max="255" v-model.trim ="state.disciplinary_sector"> 
                </div> 

                <div class="col-12">
                    <label for="discipline_description" class="my-2  fw-bold">Description du secteur</label>
                    <textarea type="text" id="discipline_description" class="form-control"  v-model.trim ="state.discipline_description"></textarea>
                </div> 

            </div>

            <div class="row mb-3">
                <div class="col-12 col-md">
                    <label for="nbrCredit" class="my-2  fw-bold">Nombre de crédit*</label>
                    <input type="number" id="nbrCredit" class="form-control"  v-model.number ="state.nbrCredit">
                </div> 
            </div>

            <div class="row mb-3">
                <div class="col-12 col-md">
                    <label for="cycle" class="my-2  fw-bold fw-bold">Cycle*</label>
                    <input type="number"  min="1" max="4"  v-model.number ="state.cycle" id="cycle" class="form-control">
                </div> 

                <div class="col-12 col-md">
                    <label for="duration" class="my-2  fw-bold fw-bold">Durée*</label>
                        <div class="row">
                            <input type="number" min="0" max="6" id="duration" class="form-control col mx-1"  v-model.number="state.duration">
                            <input type="text" id="duration" class="form-control col"  v-model="state.duration" >
                        </div>                  
                </div> 
            </div>

            <div class="row mb-3" title="Langue d'enseignement">
                <div class="col-12 col-md">
                    <label for="languages" class="my-2  fw-bold">Langue(s)*</label>
                    <input type="text" id="languages" class="form-control"  v-model="state.languages">
                </div> 
            </div>

            <div class="row mb-3">
                <div class="col-12 col-md">
                    <label for="admission_scheme" class="my-2  fw-bold">Shema d'admission*</label>
                    <input type="type" id="admission_scheme" class="form-control"  v-model="state.admission_scheme">
                </div> 
            </div> 

            <div class="row">
                <div class="modal-footer">
                    <button class="btn btn-success">TES </button>
                    <button class="btn btn-success">TES </button>
                </div>
               
            </div>

        </form>
        
    </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { programModel as Program } from '@/model/programs'
import useVuelidate from '@vuelidate/core';
export default{ 
  methods: {
     
  },
    setup(){
        const state = reactive({...Program});

        const rules = computed(()=>{
            return {

            }
        })
        const v$ = useVuelidate(rules,state)
        return {state,v$}
    }
}
</script>
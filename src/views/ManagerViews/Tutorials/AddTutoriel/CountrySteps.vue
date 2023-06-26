<template>
    <div>
        <div class="mb-5">
          <h2 class="h5 lead text-center">Etapes génerales à suivre pour étudier : <span class="fw-bold">{{ countrySelected?.name }}</span></h2>
        </div>
        <form novalidate v-on:submit.prevent="onsubmit">
            <div class="row">
                <div class="form-group col-sm-4">
                    <label for="Titre" class="fw-bold">Titre *</label>
                    <input type="text" id="Titre" class="form-control"  v-model="state.title">
                </div>
                <div class="form-group col-sm-4">
                    <label for="stepNum" class="fw-bold">Numéro étape *</label>
                    <input type="number" min="1" class="form-control" id="stepNum"  v-model="state.noStep">
                </div>
                <div class="form-group col-sm-4">
                    <label for="Description" class="fw-bold">Description</label>
                    <textarea class="form-control" id="Description" rows="5"  v-model="state.description"></textarea>
                </div>
                <div class="form-group mt-3">
                    <button class="btn btn-primary" @click="addSteps">Ajouter une étape</button>
                    <button class="btn btn-success mx-1">Enregister</button>
                </div>
            </div>
        </form>
    </div> {{ formData }}
</template>
<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';
import { mapGetters } from 'vuex';
import { computed, reactive } from 'vue';
import customeMessage from '@/Utils/validationMessages';
import useVuelidate from '@vuelidate/core';

export default {
  methods: {
    test(){
        console.log(this.formData)
    }
  },
  
  data () {
    return {
        formData:[],
        saveState:''
    }
  },
    
    setup() {
    const state = reactive({
        title : '',
        noStep: 1,
        description:'', 
    })

    const rules = computed(() => {
        return {
        title : {required:customeMessage("email",'required'),email:customeMessage("email",'email')},  
        noStep : {required:customeMessage("email",'required'),email:customeMessage("email",'email')},   
    }
    })
    const v$ = useVuelidate(rules,state);
    return {state,v$}
  },
    computed: {
        ...mapGetters('countryStep', {
            countrySelected: 'getCountrySelected'
        }),

        addSteps(){
            this.formData.push(this.state)  
        }
    },
    created() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    },
    components: { SubmitBtnComponent }
}


</script>

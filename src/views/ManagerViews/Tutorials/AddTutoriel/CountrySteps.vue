<template>
    <div>
        <div class="mb-5">
            <h2 class="h5 lead text-center">Etapes génerales à suivre pour étudier : <span class="fw-bold">{{
                countrySelected?.name }}</span></h2>

            <section v-if="countrySteps.length">
                <table class="table caption-top table-hover">
                    <caption>Nombre d'étapes : <span class="fw-semibold">{{ countrySteps.length }}</span></caption>
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">N</th>
                            <th scope="col">Titre</th>
                            <th scope="col">Description</th> 
                            <th scope="col">Action</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(step,index) in countrySteps" :key="index"  >
                            <th scope="row">{{ step.order }}</th>
                            <td>{{step.title}}</td>
                            <td>{{ step.description }}</td> 
                            <td>
                                <button class="btn btn-warning m-1" title="Modifier cette étape"><font-awesome-icon icon="fa-pen" style="color: #f0f0f0;"/></button>
                                <button class="btn btn-danger m-1" @click="deleteStep(index)" title="Supprimer cette étape"><font-awesome-icon icon="fa-trash" /></button> 
                            </td> 
                        </tr> 
                    </tbody>
                </table>
            </section>
        </div>

        <form novalidate v-on:submit.prevent="saveSteps" ref="addStepsForm">
            <div class="row">
                <div class="form-group col-sm-4">
                    <label for="Titre" class="fw-bold">Titre *</label>
                    <input type="text" id="Titre" class="form-control" :class="[v$.title.$error ? 'is-invalid' : '']" v-model.trim="state.title">
                    <div class="invalid-feedback" v-if="v$.title.$error">
                        <span v-for="(error, index) of v$.title.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
                <div class="form-group col-sm-4">
                    <label for="stepNum" class="fw-bold">Numéro étape *</label>
                    <input type="number" min="1" class="form-control" id="stepNum" v-model="state.order">
                </div>
                <div class="form-group col-sm-4">
                    <label for="Description" class="fw-bold">Description</label>
                    <textarea class="form-control" id="Description" rows="5" v-model="state.description"></textarea>
                </div>
                <div class="form-group mt-3">
                    <button class="btn btn-primary" @click="addSteps">Ajouter une étape</button>
                    <button class="btn btn-success mx-1" @click="saveSteps">Enregister</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';
import { mapGetters } from 'vuex';
import { computed, reactive } from 'vue';
import customeMessage from '@/Utils/validationMessages';
import useVuelidate from '@vuelidate/core';

export default {
    methods: {
        addSteps() {
            this.v$.$validate(); 
            if(!this.v$.$error){
            this.countrySteps.push(this.createCoutryStepModel())
            this.state.order++ 
            this.v$.$reset();
            this.state.title=''
        }        
        },
        saveSteps() { 
          
            //this.$store.dispatch('countryStep/saveSteps',this.countrySteps);
            console.log(this.countrySteps)
           
        },
        deleteStep(index) {
            this.orderSteps(index);
            this.countrySteps.splice(index,1);
            this.state.order = this.countrySteps.length + 1 
        },

        orderSteps(index) {
            for (var i = 0; i < this.countrySteps.length; i++) {
                if (this.countrySteps[i].order === index + 1) {
                    if (this.countrySteps[i + 1]) {
                        this.countrySteps[i + 1].order = this.countrySteps[i + 1].order - 1
                    }
                }
            }
        },
        createCoutryStepModel() {
            return {
                title: this.state.title,
                order: this.state.order,
                description: this.state.description,
                country_id: this.countrySelected?.id, 
            }
        }
    },

    data() {
        return {
            countrySteps: [],
        }
    },

    setup() {
        const state = reactive({
            title: '',
            order: 1,
            description: '', 
        })

        const rules = computed(() => {
            return {
                title: { required: customeMessage("title", 'required')}, 
            }
        })
        const v$ = useVuelidate(rules, state);
        return { state, v$ }
    },
    computed: {
        ...mapGetters('countryStep', {
            countrySelected: 'getCountrySelected'
        }),
    },
    created() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    },
    components: { SubmitBtnComponent }
}


</script>

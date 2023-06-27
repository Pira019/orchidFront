<template>
    <div>
        <div class="mb-5">
            <h2 class="h5 lead text-center">Etapes génerales à suivre pour étudier : <span class="fw-bold">{{
                countrySelected?.name }}</span></h2>

            <section>
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
                                <button class="btn btn-warning m-1">d</button>
                                <button class="btn btn-danger m-1" @click="deleteStep(index)">del</button> 
                            </td> 
                        </tr> 
                    </tbody>
                </table>
            </section>
        </div>

        <form novalidate v-on:submit.prevent="onsubmit">
            <div class="row">
                <div class="form-group col-sm-4">
                    <label for="Titre" class="fw-bold">Titre *</label>
                    <input type="text" id="Titre" class="form-control" v-model="state.title">
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
                    <button class="btn btn-primary" @click="addSteps()">Ajouter une étape</button>
                    <button class="btn btn-success mx-1">Enregister</button>
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
            this.countrySteps.push(this.createCoutryStepModel())
            this.state.order++
        },
        deleteStep(index) {
            this.countrySteps.splice(index,1); 
        },
        createCoutryStepModel() {
            return {
                title: this.state.title,
                order: this.state.order,
                description: this.state.description,
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
                title: { required: customeMessage("email", 'required'), email: customeMessage("email", 'email') },
                order: { required: customeMessage("email", 'required'), email: customeMessage("email", 'email') },
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

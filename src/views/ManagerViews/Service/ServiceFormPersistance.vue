<template>
    <form novalidate v-on:submit.prevent="submit">
        <div class="row mb-3">
            <div class="form-group  col-md-6">
                <label for="pays" class="my-2  fw-bold fw-bold"
                    :class="[v$.country_id.$error && 'text-danger']">Pays*</label>
                <select class="form-select" id="pays" :class="[v$.country_id.$error && 'is-invalid']"
                    v-model="state.country_id">
                    <option value="">4</option>
                    <option value="">2</option>
                </select>

                <div class="invalid-feedback" v-if="v$.country_id.$error">
                    <span v-for="(error, index) of v$.country_id.$errors" :key="index">
                        {{ error.$message }}
                    </span>
                </div>
            </div>


            <div class=" col-md-6 form-group">
                <label for="discipline" class="my-2  fw-bold  fw-bold"
                    :class="[v$.service_disciplinaries.$error && 'text-danger']">Disciplines*</label>
                <select class="form-control" multiple="multiple" id="disciplines"
                    v-model="state.service_disciplinaries">
                    <option value="1">4</option>
                    <option value="2">2</option>
                </select>

                <div class="text-danger" v-if="v$.service_disciplinaries.$error">
                    <span v-for="(error, index) of v$.service_disciplinaries.$errors" :key="index">
                        {{ error.$message }}
                    </span>
                </div>
            </div>
        </div>

        <div class="row mb-3">
            <div class="form-group  col-md-6">
                <label for="Prix" class="my-2  fw-bold  fw-bold"
                    :class="[v$.price.$error && 'text-danger']">Prix*</label>
                <input type="number" placeholder="Ex: 100.00" id="Prix" class="form-control" min="1"
                    :class="[v$.price.$error && 'is-invalid']" v-model.number="state.price">

                <div class="invalid-feedback" v-if="v$.price.$error">
                    <span v-for="(error, index) of v$.price.$errors" :key="index">
                        {{ error.$message }}
                    </span>
                </div>
            </div>

            <div class=" col-md-6 form-group">
                <label for="annee" class="my-2  fw-bold  fw-bold"
                    :class="[v$.year.$error && 'text-danger']">Année*</label>
                <input type="text" placeholder="Ex: 2022" id="annee" class="form-control"
                    :class="[v$.year.$error && 'is-invalid']" v-model.number="state.year">
                <div class="invalid-feedback" v-if="v$.year.$error">
                    <span v-for="(error, index) of v$.year.$errors" :key="index">
                        {{ error.$message }}
                    </span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="modal-footer">
                <button class="btn btn-secondary">Annuler</button>
                <SubmitBtnComponent class="btn btn-success" @click="submitForm">Enregistrer</SubmitBtnComponent>
            </div>

        </div>
    </form>
</template>
<script>
import { ServiceModel } from '@/model/ServiceModel';
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';
import { computed, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import customeMessage from '@/Utils/validationMessages';


export default {
    methods: {
        submitForm() {
            this.v$.$validate();
            console.log(this.state)
        }
    },
    mounted() {
        $('#annee').datepicker({
            format: "yyyy",
            viewMode: "years",
            startDate: new Date(),
            minViewMode: "years"
        }); 

    },
    setup() {
        const state = reactive({
            ...ServiceModel
        });
        const rules = computed(() => {
            return {
                year: { required: customeMessage('year', 'required'), integer: customeMessage('year', 'integer') },
                price: { required: customeMessage('price', 'required'), integer: customeMessage('price', 'integer') },
                service_disciplinaries: { required: customeMessage('service_disciplinaries', 'required') },
                country_id: { required: customeMessage('country_id', 'required') }
            }
        })
        const v$ = useVuelidate(rules, state);
        return { state, v$ }
    },

    components: { SubmitBtnComponent },

}
</script>
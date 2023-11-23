<template>
    <div>
        <form class="my-5" novalidate v-on:submit.prevent="submit">
            <div class="row mb-3">
                <div class="col-12 col-md">
                    <label for="program_name" class="my-2  fw-bold  fw-bold"
                        :class="[v$.program_name.$error && 'text-danger']">Programme*</label>
                    <input type="text"
                        placeholder="Ex: Baccalauréat en administration,Baccalauréat en arts et en design ..."
                        id="program_name" class="form-control" max="255" v-model.trim="state.program_name"
                        :class="[v$.program_name.$error && 'is-invalid']">
                    <div class="invalid-feedback" v-if="v$.program_name.$error">
                        <span v-for="(error, index) of v$.program_name.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-12">
                    <label for="discipline_name" class="my-2  fw-bold"
                        :class="[v$.disciplinary_sector.$error && 'text-danger']">Secteur disciplinaire*</label>
                    <input type="text" id="discipline_name" class="form-control" max="255"
                        :class="[v$.disciplinary_sector.$error && 'is-invalid']"
                        placeholder="Ex: Administration, Comptabilité ..." v-model.trim="state.disciplinary_sector">
                    <div class="invalid-feedback" v-if="v$.disciplinary_sector.$error">
                        <span v-for="(error, index) of v$.disciplinary_sector.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>

                <div class="col-12">
                    <label for="discipline_description" class="my-2  fw-bold">Description du secteur disciplinaire</label>
                    <textarea type="text" id="discipline_description" class="form-control"
                        v-model.trim="state.discipline_description"></textarea>
                </div>

            </div>

            <div class="row mb-3">
                <div class="col-12 col-md">
                    <label for="nbrCredit" class="my-2  fw-bold" :class="[v$.nbrCredit.$error && 'text-danger']">Nombre de
                        crédit*</label>
                    <input type="number" id="nbrCredit" min="0" class="form-control" v-model.number="state.nbrCredit"
                        :class="[v$.nbrCredit.$error && 'is-invalid']">
                    <div class="invalid-feedback" v-if="v$.nbrCredit.$error">
                        <span v-for="(error, index) of v$.nbrCredit.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-12 col-md">
                    <label for="cycle" :class="[v$.cycle.$error && 'text-danger']"
                        class="my-2  fw-bold fw-bold">Cycle*</label>
                    <input type="number" placeholder="Ex: 1,2 ..." :class="[v$.cycle.$error && 'is-invalid']" min="1"
                        max="3" v-model.number="state.cycle" id="cycle" class="form-control">
                    <div class="invalid-feedback" v-if="v$.cycle.$error">
                        <span v-for="(error, index) of v$.cycle.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>

                <div class="col-12 col-md">
                        <label for="duration" class="my-2 fw-bold fw-bold"
                            :class="[v$.duration.$error && 'text-danger']">Durée*
                            <span data-toggle="tooltip" data-placement="top" title="Entrer 0 si c'est moins d'une année">
                             <font-awesome-icon icon="fa-solid fa-circle-info" class="text-success" />
                          </span>
                   
                        </label>
                        <div class="row">
                            <input type="number" min="0" max="7" :class="[v$.duration.$error && 'is-invalid']" id="duration"
                                class="form-control col mx-1" v-model.number="state.duration">
                            <div class="invalid-feedback" v-if="v$.duration.$error">
                                <span v-for="(error, index) of v$.duration.$errors" :key="index">
                                    {{ error.$message }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            <div class="row mb-3" title="Langue d'enseignement">
                <div class="col-12 col-md">
                    <label for="languages" class="my-2 fw-bold"
                        :class="[v$.languages.$error && 'text-danger']">Langue(s)*</label>
                    <input type="text" id="languages" :class="[v$.languages.$error && 'is-invalid']" class="form-control"
                        v-model="state.languages">
                    <div class="invalid-feedback" v-if="v$.languages.$error">
                        <span v-for="(error, index) of v$.languages.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col-12 col-md">
                    <label for="admission_scheme" :class="[v$.admission_scheme.$error && 'text-danger']"
                        class="my-2  fw-bold">Régime d'admission*</label>
                    <input type="type" id="admission_scheme" :class="[v$.admission_scheme.$error && 'is-invalid']"
                        class="form-control" v-model="state.admission_scheme">
                    <div class="invalid-feedback" v-if="v$.admission_scheme.$error">
                        <span v-for="(error, index) of v$.admission_scheme.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button">Annuler </button>
                    
                    <button class="btn btn-success" @click="submit">Enregistrer </button>
                </div>

            </div>

        </form>

    </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { programModel as Program } from '@/model/programs'
import useVuelidate from '@vuelidate/core';
import customeMessage from '@/Utils/validationMessages';
export default {
    mounted() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    },
    methods: {
        //hadle save
        submit() {
            this.v$.$validate();
            if (this.v$.$error) {
                return;
            }

        }
    },
    setup() {
        const state = reactive({ ...Program });

        const rules = computed(() => {
            return {
                program_name: { maxLength: customeMessage('program_name', 'maxLength', 255), required: customeMessage('program_name', 'required') },
                disciplinary_sector: { maxLength: customeMessage('disciplinary_sector', 'maxLength', 255), required: customeMessage('disciplinary_sector', 'required') },
                nbrCredit: { maxLength: customeMessage('nbrCredit', 'maxLength', 3), required: customeMessage('nbrCredit', 'required') },
                cycle: { maxLength: customeMessage('cycle', 'maxLength', 1), required: customeMessage('cycle', 'required') },
                duration: { maxLength: customeMessage('duration', 'maxLength', 1), required: customeMessage('duration', 'required') },
                languages: { required: customeMessage('languages', 'required') },
                admission_scheme: { required: customeMessage('admission_scheme', 'required') },
            }
        })
        const v$ = useVuelidate(rules, state)
        return { state, v$ }
    }
}
</script>
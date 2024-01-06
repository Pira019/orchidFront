<template>
    <div>
       
        <form class="my-5" novalidate v-on:submit.prevent="submit">

           <ErrorAlert :show="!!errors.length" :response="errors"></ErrorAlert>
            <div class="row mb-3">
                <div class="col-12 col-md">
                    <label for="program_name" class="my-2  fw-bold  fw-bold"
                        :class="[v$.program_name.$error && 'text-danger']">Programme*</label>

                        <select  class="form-select" id="program_name" v-model.trim="state.program_name"  :class="[v$.program_name.$error ? 'is-invalid' : '']">
                            <option selected value=""></option>
                            <option v-for="(program,index) in programs" :key="index" :value="program.name">{{ program.name }}</option>
                            <option value="other"> ** Autre programme **</option>
                         </select>      

                        <input type="text" v-if="showCustomeProgramInput" placeholder="Ex: Baccalauréat en administration,Baccalauréat en arts et en design ..."  id="program_name" class="form-control mt-4" max="255" v-model.trim="state.program_name_custome"
                            :class="[v$.program_name_custome.$error && 'is-invalid']">                       

                    <div class="invalid-feedback" v-if="v$.program_name.$error || v$.program_name_custome.$error"> 
                        <span v-for="(error, index) of [...(v$.program_name.$errors || []), ...(v$.program_name_custome.$errors || [])]" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>

                <div class="col-12 mt-3">
                    <label for="program_description" class="my-2  fw-bold"  :class="[v$.program_description.$error && 'text-danger']" >Description du programme*</label>
                    <textarea  id="program_description" class="form-control" :class="[v$.program_description.$error && 'is-invalid']"
                        v-model.trim="state.program_description"></textarea>
                        <div class="invalid-feedback" v-if="v$.program_description.$error">
                            <span v-for="(error, index) of v$.program_description.$errors" :key="index">
                                {{ error.$message }}
                            </span>
                        </div>    
                </div>

            </div>

            <div class="row mb-3">
                <div class="col-12">
                    <label for="discipline_name" class="my-2  fw-bold"
                        :class="[v$.discipline_name.$error && 'text-danger']">Secteur disciplinaire*</label>


                        <select  class="form-select" id="discipline_name" v-model.trim="state.discipline_name"  :class="[v$.discipline_name.$error ? 'is-invalid' : '']">
                            <option selected value=""></option>
                            <option v-for="(disciplinarySector,index) in disciplinarySectors" :key="index" :value="disciplinarySector">{{ disciplinarySector.label }}</option>
                            <option value="other"> ** Autre secteur disciplinaire **</option>
                         </select>   

                    <input type="text" id="discipline_name" class="form-control mt-4" max="255" v-if="showCustomeDiscplinaryInput"
                        :class="[v$.disciplinarySectorCustome.$error && 'is-invalid']"
                        placeholder="Ex: Administration, Comptabilité ..." v-model.trim="state.disciplinarySectorCustome">

                    <div class="invalid-feedback" v-if="v$.disciplinarySectorCustome.$error || v$.disciplinarySectorCustome.$error">
                        <span v-for="(error, index) of [... (v$.discipline_name.$errors || []), ... ( v$.disciplinarySectorCustome.$errors || [] )]" :key="index">
                            {{ error.$message }}
                        </span>
                    </div>
                </div>

                <div class="col-12 mt-3">
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
                     <label for="languages" class="my-2 fw-bold"  :class="[v$.languages.$error && 'text-danger']">Langue(s)*</label>                    
                    
                    <select multiple class="form-control" id="languages" size="2" :class="[v$.languages.$error && 'is-invalid']"  v-model="state.languages">
                        <option value="Français">Français</option>
                        <option value="Anglais">Anglais</option>
                    </select>

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
                   
                         <select multiple class="form-control" id="admission_scheme" size="2" :class="[v$.admission_scheme.$error && 'is-invalid']"  v-model="state.admission_scheme">
                            <option value="Temps plein">Temps plein</option>
                            <option value="Temps partiel">Temps partiel</option> 
                        </select>

                        <div class="invalid-feedback" v-if="v$.admission_scheme.$error">
                            <span v-for="(error, index) of v$.admission_scheme.$errors" :key="index">
                                {{ error.$message }}
                            </span>
                        </div>
                    </div>
                </div>

            <div class="row">
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" @click="cancel">Annuler </button> 
                    <SubmitBtnComponent class="btn btn-success" @click="submit" :loading="isLoading">Enregistrer</SubmitBtnComponent>
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
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';   
import ErrorAlert from '@/components/shared/Alert/ErrorAlert.vue';
export default {
  components: { SubmitBtnComponent, ErrorAlert },
    props: {
        isModalClosed: {
            type: Boolean
        },

        programToEdit:{
            type : Object,
            default : null,
        }
    },

   watch: {
        isModalClosed(newValue) {
            newValue && this.cancel();  
        },

        programToEdit(program)
        {
            if(program){
              this.prepareDataToUpdate(program)
            }
        }
    }, 
    data() {
        return {
            programs: [],
            disciplinarySectors: [],
            isLoading:false,  
            isRequestSuccessful : null,
            errors : []
        };
    },
    mounted() {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
        this.prefilForm();
    },
    computed: {

        showCustomeProgramInput() {
            if (this.state.program_name === "other") {
                return true;
            }
            this.state.program_name_custome = null;
        },
        showCustomeDiscplinaryInput() {
            if (this.state.discipline_name === "other") {
                this.state.discipline_description = null;
                return true;
            }
            this.state.discipline_description = this.state.discipline_name?.description;
            this.state.disciplinarySectorCustome = null;
        }
    },
    methods: {

        prepareDataToUpdate(selectedProgram) {
            const { languages, admission_scheme, discipline_description, discipline_name, ...rest } = selectedProgram;

            
            Object.assign(this.state, {
                ...rest,
                languages: languages.split(','),
                admission_scheme: admission_scheme.split(','),
                isUpdate: true,
                discipline_name: {
                    label: discipline_name,
                    description: discipline_description,
                },
            }
            )

        },
        cancel() {
            Object.assign(this.state, { ...Program,isUpdate:null }); //reset state   
            this.v$.$reset();
            this.errors = []; 
            this.state.program_name
            this.$emit('closePersiteModal'); 
        },
        
        prefilForm() {
            this.$store.dispatch('universityProgramManager/getPrefilData').then((response) => {
                this.programs = response.data.programs;
                this.disciplinarySectors = response.data.disciplines;
            });
        },
 
        //hadle save
        submit() 
        {    
            
            this.v$.$reset();  
            this.v$.$validate();
            if (this.v$.$error) {
                return;
            }

            const universityId = parseInt(this.$route.params.id);
            const data = this.preparedData();
            this.isLoading = true;
            let codeErreur = null;
            this.$store.dispatch('universityManager/addUniversityProgram', { universityId, data })
                .then((response) => {
                    const id = response?.data
                    //add to program list

                    const mutationType = data.isUpdate ? 'universityManager/upDateProgram' : 'universityManager/addToProgramList';
                    const payload = data.isUpdate ? data : { ...data, id };
                    this.$store.commit(mutationType, payload);

                    this.isRequestSuccessful = true; 
                    
                    this.cancel();     

                }).catch((error) => {

                    this.isRequestSuccessful = false;
                    if (!error.response) {
                        this.errors = [["Erreur lors de la requête"]]
                        return false
                    }
                    codeErreur =  error.response.status; 
                    this.errors= error?.response?.data?.errors ??  [[error.response?.data.error]] 

                }).finally(() => {

                    this.isLoading = false;  
                    this.$emit('showPersistModalResponse',this.isRequestSuccessful,codeErreur);   
                });  
        },

        preparedData() {

            const { program_name_custome, disciplinarySectorCustome } = this.state;
            const programData = {
                ...this.state,
                program_name: program_name_custome ?? this.state.program_name,
                discipline_name: disciplinarySectorCustome ?? this.state.discipline_name?.label,
                languages: this.state.languages.join(','),
                admission_scheme: this.state.admission_scheme.join(','),
            };
            return programData;
        }
    },
    setup() {
        const state = reactive({
            ...Program,
            program_name_custome: null,
            disciplinarySectorCustome: null
        });
        const rules = computed(() => {
            return {
                program_name: { maxLength: customeMessage('program_name', 'maxLength', 255), required: customeMessage('program_name', 'required') },
                program_name_custome: { maxLength: customeMessage('program_name', 'maxLength', 255), requiredIf: customeMessage('program_name', 'requiredIf', state.program_name === "other") },
                discipline_name: { maxLength: customeMessage('discipline_name', 'maxLength', 255), required: customeMessage('discipline_name', 'required') },
                disciplinarySectorCustome: { maxLength: customeMessage('discipline_name', 'maxLength', 255), required: customeMessage('discipline_name', 'requiredIf', state.discipline_name === "other") },
                nbrCredit: { maxLength: customeMessage('nbrCredit', 'maxLength', 3), required: customeMessage('nbrCredit', 'required') },
                cycle: { maxLength: customeMessage('cycle', 'maxLength', 1), required: customeMessage('cycle', 'required') },
                duration: { maxLength: customeMessage('duration', 'maxLength', 1), required: customeMessage('duration', 'required') },
                languages: { required: customeMessage('languages', 'required') },
                admission_scheme: { required: customeMessage('admission_scheme', 'required') },
                program_description: { required: customeMessage('program_description', 'required') },
            };
        });
        const v$ = useVuelidate(rules, state);
        return { state, v$ };
    }, 
}
</script>
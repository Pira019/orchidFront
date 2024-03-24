<template>
    <div>
        <form novalidate v-on:submit.prevent="submit" id="addAdmissionForm">
            <RequestAlert :is-succeed="isSucceed" :response-message="requestResponse"  v-if="isSucceed != null"></RequestAlert>
            <div class="row mb-3">
                <div class="col-12 col-md ">
                    <label for="sessionAdmission" class="my-2 fw-bold"  :class="[v$.session_admission.$error && 'text-danger']">Session d'admission*</label>
                    <div class="form-check"  >
                        <input class="form-check-input" :class="[v$.session_admission.$error && 'is-invalid']" type="checkbox" value="Printemps" id="printemps" v-model="state.session_admission">
                        <label class="form-check-label" for="printemps">
                            Printemps
                        </label> 
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Eté" id="Eté" v-model="state.session_admission" :class="[v$.session_admission.$error && 'is-invalid']"> 
                        <label class="form-check-label" for="Eté">
                            Eté
                        </label> 
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Automne" id="automne" v-model="state.session_admission" :class="[v$.session_admission.$error && 'is-invalid']">
                        <label class="form-check-label" for="Automne">
                            Automne
                        </label> 
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="Hiver" id="hiver" v-model="state.session_admission" :class="[v$.session_admission.$error && 'is-invalid']">
                        <label class="form-check-label" for="Hiver">
                            Hiver
                        </label> 
                    </div>   
                </div> 

                <div class="text-danger mt-1" v-if="v$.session_admission.$error"> 
                        <span v-for="(error, index) of v$.session_admission.$errors" :key="index">
                            {{ error.$message }}
                        </span> 
                    </div> 
            </div>
            <div class="row mb-2">
                <div class="col-12 col-md">
                    <label for="Lien" class="my-2 fw-bold" :class="[v$.link.$error && 'text-danger']">Lien*</label>
                    <input type="url" id="Lien"  :class="[v$.link.$error && 'is-invalid']" class="form-control" v-model.trim="state.link" placeholder="Ex: www.exemple.com" >
                    <div class="invalid-feedback" v-if="v$.link.$error">
                        <span v-for="(error, index) of v$.link.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div> 
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-12 col-md">
                    <label for="Type" class="my-2 fw-bold" :class="[v$.type.$error && 'text-danger']">Type*</label>
                    <input type="text" id="Type" :class="[v$.type.$error && 'is-invalid']" class="form-control" v-model.trim="state.type">
                    <div class="invalid-feedback" v-if="v$.type.$error">
                        <span v-for="(error, index) of v$.type.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div> 
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md">
                    <label for="debut" :class="[v$.start_at.$error && 'text-danger']" class="my-2 fw-bold">Début d'admission*</label>
                    <input type="date" id="debut" class="form-control" v-model.trim="state.start_at" :class="[v$.start_at.$error && 'is-invalid']"> 
                    <div class="invalid-feedback" v-if="v$.start_at.$error">
                        <span v-for="(error, index) of v$.start_at.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div> 
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md">
                    <label for="fin" class="my-2 fw-bold" :class="[v$.end_at.$error && 'text-danger']">Fin d'admission*</label>
                    <input type="date" id="fin" class="form-control"  v-model.trim="state.end_at" :class="[v$.end_at.$error && 'is-invalid']">
                    <div class="invalid-feedback" v-if="v$.end_at.$error">
                        <span v-for="(error, index) of v$.end_at.$errors" :key="index">
                            {{ error.$message }}
                        </span>
                    </div> 
                </div>
            </div>

            <div class="row">
                <div class="modal-footer">
                    <button class="btn btn-secondary" type="button" @click="cancel">Annuler </button> 
                    <SubmitBtnComponent  class="btn btn-success" @click="submitForm" :loading="isLoading">Enregistrer</SubmitBtnComponent>
                </div>
            </div>
        </form>
    </div>


</template>

<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';
import { reactive } from 'vue';
import { UniversityAdmissionDate } from '@/model/UniversityAdmissionDate';
import { computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import customeMessage from '@/Utils/validationMessages';
import errorMessage from '@/Utils/ErrorMessage';
import RequestAlert from '@/components/shared/Alert/RequestAlert.vue';
import messageFr from '@/lang/fr.json'

export default {
    props:{
        programId:{
            type:Number,
            required : true,
        }
    },
  methods: {
    cancel(){
        
       
        this.isSucceed=null;
        this.$emit('closePersiteModal') ;
    },
    submitForm(){ 
        
        this.v$.$validate(); 
        if(this.v$.$error){
            return;
        }
        
        this.isLoading = true;
     
        this.$store.dispatch('universityAdmissionManager/addAdmission',this.prepareModel())
            .then((response) => {

                this.isSucceed = true;    
                this.requestResponse = messageFr.messageRequest.success.save
                this.$emit('newDateAdded',response.data) ;
                this.resetForm();

            }).catch((error)=> {

                this.isSucceed = false;              
                this.requestResponse = errorMessage(error);

            }).finally(()=>{
                this.isLoading = false;
            })

    },
    resetForm()
    {
        this.v$.$reset();
        Object.assign(this.state,{...UniversityAdmissionDate}); 
    },

     prepareModel() {
          const { session_admission, ...rest } = this.state;
          const updatedSessionAdmission = Array.isArray(session_admission) ? session_admission.join() : '';
          return  {
              ...rest,
              session_admission: updatedSessionAdmission,
              detail_program_id: this.programId
          };
 
      }
       
  }, 
}
year : { required : customeMessage('year','required'), integer : customeMessage('year', 'integer')},
              price : { required : customeMessage('price','required'), integer : customeMessage('price', 'integer')},
              service_disciplinaries : { required: customeMessage('country_id', 'required')},
              country_id : { required: customeMessage('country_id', 'required') }
    
    setup() {
        const state = reactive({
            ...UniversityAdmissionDate
        });
        const rules = computed(() => {
            return {
                link: { required : customeMessage('link','required'), url : customeMessage('', 'url')} ,
                session_admission:  { maxLength: customeMessage('session_admission', 'maxLength', 55), required: customeMessage('session_admission', 'required') },
                type: { maxLength: customeMessage('type', 'maxLength', 55), required: customeMessage('type', 'required') },
                start_at: { maxLength: customeMessage('start_at', 'maxLength', 55), required: customeMessage('start_at', 'required') },
                end_at: { maxLength: customeMessage('end_at', 'maxLength', 55), required: customeMessage('end_at', 'required') },
            }
        })

        const v$ = useVuelidate(rules,state);
        return {state,v$};
    },
    data() {
        return {
            isLoading: false,
            requestResponse : 'null',
            isSucceed : null
        }
    },
    components: { SubmitBtnComponent,RequestAlert },
}
</script>
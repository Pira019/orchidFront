<template>
    <div class="container-fluid">        
        <Spinner v-if="isDataLoading"></Spinner>
        <RequestAlert v-if="requestResponse && !isDataLoading" :response-message="requestResponse" :is-succeed="false"></RequestAlert>
        <div v-else>
            <div class="text-center">
                <img :src="universityProgram.logo" :alt="'Logo_' + universityShortName" class="img-fluid mb-2">
                <h4 class="fw-bold">{{ universityName }} <span v-show="universityShortName">({{universityShortName}})</span></h4>
                <p>Dérnière mise à jour : {{ dateFormatted(universityProgram.updated_at) }} </p>
                <p class="text-center">Programme rentrée : <span class="fw-bold">{{ serviceYear }}</span></p>
            </div>
            <div class="row">
                <div class="accordion accordion-flush" id="accordionUniversityProgram">
                    
                    <div class="accordion-item"  v-for="(program,index) in universityProgram.programs" :key="index">
                        <h2 class="accordion-header" id="flush-headingThree">
                            <button class="accordion-button collapsed text-uppercase fw-bolder" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseThree" aria-expanded="false"
                                aria-controls="flush-collapseThree">
                                {{  program.label }} 
                                    <span title="cycle" class="bg-secondary text-white p-1 rounded">{{ program.cycle}}</span>     
                            </button>
                        </h2>
                        <div id="flush-collapseThree" class="accordion-collapse collapse"
                            aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">                               
                                <div class="table-responsive-sm">
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            
                                            <th scope="col">#</th>
                                            <th scope="col">Début</th>
                                            <th scope="col">Fin</th>
                                            <th scope="col">Session</th>
                                            <th scope="col"> 
                                               <BtnConfirmModal :message="requestResponseSaveAdmissionDate" :is-request-loading="isServiceAdmissionRequestLoading" @isModalConfirm="saveAdmissionDate" v-show="state.checkedDataAdmission.length">
                                                <div v-if="showAdmissionResponse">
                                                    <div :class="requestResponseAdmision ? 'bg-danger' : 'bg-success' " class="p-1">
                                                        <p class="text-white">
                                                            <span v-if="requestResponseAdmision"> {{ requestResponseAdmision }}</span>
                                                            <span v-else> Programme ajouté avec succés</span>
                                                        </p>
                                                    </div>
                                                </div>
                                             </BtnConfirmModal>
                                             </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(admissionDate,index) in program.admission_date" :key="index">
                                            <th  scope="row">{{ index + 1}}</th>
                                            <td>{{ admissionDate.start_at}}</td> 
                                            <td>{{ admissionDate.end_at}}</td> 
                                            <td>{{ admissionDate.session_admission}}</td>  
                                            <td>
                                                <input type="checkbox" :id="'date_' + index" class="form-check" :value="admissionDate.id" v-model="state.checkedDataAdmission">
                                            </td>
                                        </tr> 
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </div>


</template>

<script>
import AccordionDefaultComponent from '@/components/shared/AccordionDefaultComponent.vue'
import Spinner from '@/components/shared/Spinner.vue';
import {UniversityProgram} from '@/model/Manager/UniversityProgram'
import formattedDate from '@/Utils/formattedDate';
import { mapGetters } from 'vuex';
import { reactive } from 'vue';
import RequestAlert from '@/components/shared/Alert/RequestAlert.vue';
import errorMessage from '@/Utils/ErrorMessage';
import BtnConfirmModal from '@/components/modal/BtnConfirmModal.vue';
export default {
   
    setup()
    {
        const state = reactive({
            checkedDataAdmission : []
        })
        return {state}
    },
  data () {
    return {
        isDataLoading : false,
        isServiceAdmissionRequestLoading : false,
        universityProgram : {...UniversityProgram},
        requestResponse : null,
        requestResponseAdmision : null,
        requestResponseSaveAdmissionDate : null,
        showAdmissionResponse : false,
    }
  },
  computed: {
        ...mapGetters('serviceManager', {
            serviceYear: 'getServiceYear', 
        })
    },
    components: { AccordionDefaultComponent,Spinner,RequestAlert,BtnConfirmModal },
    methods: {
        saveAdmissionDate(isUserComfirm)
        {
            if(!isUserComfirm){
             return  this.showAdmissionResponse = false;
            }
           this.isServiceAdmissionRequestLoading=true;
           const admissionDateIds = this.state.checkedDataAdmission;
           this.requestResponseAdmision =null;
         
            this.$store.dispatch('serviceManager/saveServiceAdmissionDates', {serviceId:this.serviceId,admissionDateIds}).then(()=>{
               
            })
            .catch((error)=>{
                this.requestResponseAdmision = errorMessage(error);
            }).finally(()=>{
                this.isServiceAdmissionRequestLoading = false;
                this.showAdmissionResponse = true;
            })
        },
        dateFormatted(date)
        {
            return formattedDate(date)
        },

        findServiceUniversityProgram(universityId)
        {             
            this.isDataLoading = true;
            this.$store.dispatch('universityManager/getProgramAndAdmissionDate',{universityId:universityId,year:this.serviceYear})
            .then((response)=>
            {
                this.universityProgram = {...response.data}  
                this.requestResponse = null;   
            }).catch((error)=> {
                this.requestResponse = errorMessage(error);
            })
            .finally(()=>{
                this.isDataLoading = false
            })
    
        }
    },
    watch: {
        universityId(newValue) {
            this.findServiceUniversityProgram(newValue)
        }
    },
    props: {
        serviceId : {
            type : String
        },
        universityId: {
            type: Number
        },
        universityName: {
            type: String
        },
        universityShortName: {
            type: String
        }
    },   
}
</script>
<template>
    <div class="container-fluid">
        <Spinner v-if="isDataLoading"></Spinner>
        <div v-else>
            <div class="text-center">
                <img :src="universityProgram.logo" :alt="'Logo_' + universityShortName" class="img-fluid mb-2">
                <h4 class="fw-bold">{{ universityName }} <span v-show="universityShortName">({{universityShortName}})</span></h4>
                <p>Dérnière mise à jour : {{ dateFormatted(universityProgram.updated_at) }} </p>
            </div>
            <div class="row">
                <div class="accordion accordion-flush" id="accordionUniversityProgram">
                    
                    <div class="accordion-item"  v-for="(program,index) in universityProgram.programs" :key="index">
                        <h2 class="accordion-header" id="flush-headingThree">
                            <button class="accordion-button collapsed text-uppercase fw-bolder" type="button" data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseThree" aria-expanded="false"
                                aria-controls="flush-collapseThree">
                                {{  program.label }}
                            </button>
                        </h2>
                        <div id="flush-collapseThree" class="accordion-collapse collapse"
                            aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <table class="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Début</th>
                                            <th scope="col">Fin</th>
                                            <th scope="col">Session</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td colspan="2">Larry the Bird</td>
                                            <td>@twitter</td>
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


</template>

<script>
import AccordionDefaultComponent from '@/components/shared/AccordionDefaultComponent.vue'
import Spinner from '@/components/shared/Spinner.vue';
import {UniversityProgram} from '@/model/Manager/UniversityProgram'
import formattedDate from '@/Utils/formattedDate';
export default {
  data () {
    return {
        isDataLoading : false,
        universityProgram : {...UniversityProgram}
    }
  },
    components: { AccordionDefaultComponent,Spinner },
    methods: {
        dateFormatted(date)
        {
            return formattedDate(date)
        },

        findServiceUniversityProgram(universityId)
        { 
            console.log(universityId)
            this.isDataLoading = true;
            this.$store.dispatch('universityManager/getProgramAndAdmissionDate',universityId)
            .then((response)=>{
                this.universityProgram = {...response.data}    
                console.log(this.universityProgram.programs)
            }).catch((error)=> {

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
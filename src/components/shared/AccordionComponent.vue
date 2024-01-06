<template>
    <div class="accordion" id="accordionExample">
        <div class="accordion-item m-2" v-for="(data,index) in data" :key="index" >
            <h2 class="accordion-header" :id="typeAccordion  + index" @click="isProgram && $emit('findProgram', data)" @mouseenter="data.isMouseOver = true" @mouseleave="data.isMouseOver =false">
                <button class="accordion-button text-dark fw-bold text-center" type="button" data-bs-toggle="collapse" :data-bs-target="'#_'+typeAccordion+index"
                    aria-expanded="true" :aria-controls="'_'+typeAccordion+index">
                   <span class="text-uppercase">{{ data?.title || data?.program_name }}</span> 
                   <span class="badge m-2" :class="data.cycle==1 ? 'bg-secondary' : 'bg-success'" v-if="isProgram" title="Cycle"> {{ data.cycle }}</span>

                   <div class="ms-auto" v-show="data.isMouseOver" v-if="isProgram">
                        <div class="btn-group" role="group" aria-label="action group"> 
                        <button type="button" class="btn btn-danger" title="supprimer un programme" @click="$emit('deleteUniversityProgram', { name: data.program_name, id: data.id })"><font-awesome-icon icon="fa-solid fa-trash" /></button>                   
                        <button  @click="$emit('editUniversityProgram',data)" type="button" class="btn btn-warning" title="modifier un programme"><font-awesome-icon class="text-white" icon="fa-solid fa-pen" /></button>                   
                    </div> 
                </div> 
            </button>
            </h2>
            <div :id="'_'+typeAccordion+index" data-bs-parent="#accordionExample" class="accordion-collapse collapse" :class="typeAccordion == 'step' && 'show'" :aria-labelledby="typeAccordion  + index" >
                <div class="accordion-body">
                    <p class="text-justify"> {{  data?.description ?? 'Aucune description ' }} </p>

                    <section v-if="detail" class="m-4" id="detail">
                        <header class="mb-3">
                            <h3 class="text-success fw-bold h5">Détails</h3>
                        </header>

                        <div class="mt-2">                            
                            <ul>
                                <li>Visibilité : <strong>  {{ data?.visibility ? 'Oui' : 'Non' }} </strong></li>
                                <li>Dérniere modification : <strong> {{ data?.updated_at ? formattedDate(data?.updated_at) : formattedDate(data?.created_at) }}</strong>  </li>
                            </ul>

                            <div v-if="showDetailBtn">
                                <button class="btn btn-warning m-1" @click="$emit('editTuto',data)">Modifier</button>
                                <button class="btn btn-danger m-1" title="supprimer" @click="$emit('tutoToDelete',data)">Delete</button>
                            </div>
                        </div>                       
                    </section> 
                    <slot></slot>
                </div> 
            </div>
        </div> 

        <div v-if="!data.length">
            <p class="text-success">Liste vide</p>
        </div>
    </div>
</template>

<script> 
export default {
  data () {
    return {
        isMouseOver  : false
    }
  },
    methods: {

        formattedDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };             
            return new Date(date).toLocaleDateString('fr-FR', options);
        }
    },
    props: {
        data: {},
        showDetailBtn :{
            type : Boolean,
            default : false
        },
        typeAccordion : {
            default : 'step'
        },
        detail: {
            default: false
        },
        isProgram: {
            default: false
        }
    }
}
</script>
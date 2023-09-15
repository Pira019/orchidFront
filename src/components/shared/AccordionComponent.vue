<template>
    <div class="accordion" id="accordionExample">
        <div class="accordion-item m-2" v-for="(data,index) in data" :key="index">
            <h2 class="accordion-header" :id="typeAccordion  + index">
                <button class="accordion-button text-dark fw-bold text-center" type="button" data-bs-toggle="collapse" :data-bs-target="'#_'+typeAccordion+index"
                    aria-expanded="true" :aria-controls="'_'+typeAccordion+index">
                   <span class="text-uppercase">{{ data?.title  }}</span>
                </button>
            </h2>
            <div :id="'_'+typeAccordion+index" class="accordion-collapse collapse" :class="typeAccordion =='step' ? 'show' : ''" :aria-labelledby="typeAccordion  + index" >
                <div class="accordion-body">
                    <p class="text-justify"> {{ data?.description ? data?.description : 'Aucune description ' }} </p>

                    <section v-if="detail" class="m-4">
                        <header class="mb-3">
                            <h3 class="text-success fw-bold h5">Détails</h3>
                        </header>

                        <div class="mt-2">                            
                            <ul>
                                <li>Visibilité : <strong>  {{ data?.visibility ? 'Oui' : 'Non' }} </strong></li>
                                <li>Dérniere modification : <strong> {{ data?.updated_at ? formattedDate(data?.updated_at) : formattedDate(data?.created_at) }}</strong>  </li>
                            </ul>
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
    methods: {

        formattedDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };             
            return new Date(date).toLocaleDateString('fr-FR', options);
        }
    },
    props: {
        data: {},
        typeAccordion : {
            default : 'step'
        },
        detail: {
            default: false
        }
    }
}
</script>
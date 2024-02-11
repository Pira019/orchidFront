<template>
    <div class="accordion" :id="typeAccordion">
        <div class="accordion-item m-2" v-for="(data, index) in data" :key="index">
            <h2 class="accordion-header" :id="typeAccordion + index" @click="handleClickOnTitle(data)"
                @mouseenter="data.isMouseOver = true" @mouseleave="data.isMouseOver = false">
                <button class="accordion-button text-dark fw-bold text-center" type="button" data-bs-toggle="collapse"
                    :data-bs-target="'#_' + typeAccordion + index" aria-expanded="true"
                    :aria-controls="'_' + typeAccordion + index">
                    <span class="text-uppercase">{{ data?.title || data?.program_name }}</span>
                    <span class="badge m-2" :class="data.cycle == 1 ? 'bg-secondary' : 'bg-success'" v-if="isProgram"
                        title="Cycle"> {{ data.cycle }}</span>

                    <div class="ms-auto" v-show="data.isMouseOver" v-if="isProgram || showDetailBtn">
                        <div class="btn-group" role="group" aria-label="action group">
                            <button type="button" class="btn btn-danger" title="Supprimer"
                            @click="handleBtnOnclick(data, false)"><font-awesome-icon
                                    icon="fa-solid fa-trash" /></button>
                            <button @click="handleBtnOnclick(data, true)" type="button" class="btn btn-warning"
                                title="Modifier"><font-awesome-icon class="text-white"
                                    icon="fa-solid fa-pen" /></button>  
                        </div>
                    </div>
                </button>
            </h2>
            <div :id="'_' + typeAccordion + index" :data-bs-parent="'#'+ typeAccordion" class="accordion-collapse collapse"
                :class="typeAccordion == 'step' && 'show'" :aria-labelledby="typeAccordion + index">
                <div class="accordion-body"> 
                    <slot name="moreOptions"></slot>  
                    <div class="mt-5">
                        <p class="text-justify"> {{ data?.description ?? 'Aucune description ' }} </p> 
                    </div>

                   
                    <section v-if="detail" class="m-4" id="detail">
                        <header class="mb-3">
                            <h3 class="text-success fw-bold h5">Détails</h3>
                        </header>

                        <div class="mt-2">
                            <ul>
                                <li>Visibilité : <strong> {{ data?.visibility ? 'Oui' : 'Non' }} </strong></li>
                                <li>Dérniere modification : <strong> {{ data?.updated_at ? formattedDate(data?.updated_at) :
                                    formattedDate(data?.created_at) }}</strong> </li>
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
    data() {
        return {
            isMouseOver: false
        }
    },
    methods: {

        formattedDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString('fr-FR', options);
        },

        handleBtnOnclick(data, isEdit = false) {
            if (this.showDetailBtn) {
                if (isEdit) {
                    return this.$emit('editTuto', data);
                } else {
                    return this.$emit('tutoToDelete', data);
                }
            }

            if (this.isProgram) {
                if (isEdit) {
                    return this.$emit('editUniversityProgram', data);
                } else {
                    return this.$emit('deleteUniversityProgram', { name: data.program_name, id: data.id });
                }
            }
        },

        handleClickOnTitle(data) {
            
            if (this.isProgram) {
                return this.$emit('findProgram', data);
            }

            if (this.showDetailBtn) {
                return this.$emit('detailItem', data?.extra_tutos);
            }
        }

    },
    props: {
        data: {},
        showDetailBtn: {
            type: Boolean,
            default: false
        },
        typeAccordion: {
            default: 'step'
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
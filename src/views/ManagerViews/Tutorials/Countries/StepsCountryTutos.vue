<template>
    <div>
     
        <section class="container-fluid">
            <header class="text-center mb-5">
                <h1>Tutoriels pour <mark> {{ countryDetail.name }} </mark></h1>
            </header>
            <div class="row  mt-3">
                <div class="col-md-2 overflow-auto">
                    <div class="mb-3">
                        <img :src="countryDetail.flagUrl" alt="img-drapeau" class="img-thumbnail" width="150">
                    </div>
                    <VerticalMenuComponent :data="stepsList" @getStep="getStepDetail"></VerticalMenuComponent>
                </div>
                <CollapseComponent class="col" :data="detailStep" :detail="true">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <h2 class="h5">Tutoriels</h2>
                            <div>
                                <button class="btn btn-primary rounded-circle" title="Ajouter un tuto"
                                    @click="showModalAddTuto"><font-awesome-icon icon="plus" /></button>
                            </div>
                        </div>

                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.
                            </p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </CollapseComponent>

            </div>
               <!--Modal-->
        <add-tuto-modal :country="countryDetail" :stepTitle='detailStep.title' :stepId="detailStep.id" :orderNbr="detailStep.order"></add-tuto-modal>
        </section>
    </div>
</template>

<script>
import CollapseComponent from '@/components/shared/CollapseComponent.vue';
import VerticalMenuComponent from '@/components/shared/VerticalMenuComponent.vue';
import { mapGetters } from 'vuex';
import AddTutoModal from './AddTutorialsToStep/AddTutoModal.vue';

export default {  
    methods: {
        getStepDetail(step) {
            this.detailStep = step;
        },
        showModalAddTuto() {
            $(document).ready(function () {
                $("#TutoModal").modal('show');
            })
        }
    },
    data() {
        return {
            detailStep: '', 
        }
    },
    computed: {
        ...mapGetters('tutorial', {
            stepsList: 'getSteps',
            countryDetail: 'getCountryDetail',
        }),
    },
    created() {
        const idCountry = parseInt(this.$route.params.id)
        this.$store.dispatch('tutorial/getCountryStepsByCountryId_', idCountry).then((response) => {
            this.detailStep = response.data.country_steps[0];
            this.$store.commit('tutorial/setSteps', response.data.country_steps);
            this.$store.commit('tutorial/setCountryDetail', { name: response.data.name, short_name: response.data.short_name, flagUrl: response.data.flag_url });
        });
    },
    components: { VerticalMenuComponent, CollapseComponent, AddTutoModal }
}
</script>
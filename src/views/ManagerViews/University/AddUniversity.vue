<template>
    <div>
        <form class="mx-5 my-5" novalidate v-on:submit.prevent="submit">
            <div class="row mb-3" id="place">
                <div class="col">
                    <label for="pays">Pays*</label>
                    <select class="form-select" id="pays">
                        <option selected>Choisir un pays...</option>
                        <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}</option>
                    </select>
                </div>
                <div class="col" v-if="isOtherCity">
                    <label for="VilleAutre">Ville*</label>
                    <input type="text" id="VilleAutre" class="form-control" placeholder="Last name">
                </div>

                <div class="col" v-if="!isOtherCity">
                    <label for="inputEmail4">Ville*</label>
                    <select class="form-select" id="inputGroupSelect04">
                        <option selected>Choose...</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option>Autre</option>
                    </select>
                </div>
            </div>

            <div class="row mb-3">
                <div class="col">
                    <label for="inputEmail4">Nom université*</label>
                    <input type="text" class="form-control"
                        placeholder="Ex : Université de montréal, Université de kinshasa ...">
                </div>
                <div class="col">
                    <label for="sigle">En sigle</label>
                    <input type="text" class="form-control" id="sigle" placeholder="Ex : UQO, UNIKIN">
                </div>

                <div class="col">
                    <label for="url">Site web*</label>
                    <input type="url" class="form-control" id="url" placeholder="Ex : UQO, UNIKIN">
                </div>
            </div>

            <div class="d-flex justify-content-between">
                 
                <div>
                    <submit-btn-component class="btn btn-success m-2">Enregister</submit-btn-component>
                </div>

                <div>
                    <button class="btn btn-warning m-2" type="reset">Effacer</button>
                    <button class="btn btn-outline-danger m-2" type="reset">Annuler</button>
                </div> 
            </div>


        </form>
    </div>
</template>

<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue'
import { computed, reactive } from 'vue'
import customeMessage from '@/Utils/validationMessages'
import useVuelidate from '@vuelidate/core'
import { mapGetters } from 'vuex'
export default {
    created() {
        this.$store.dispatch('country/getCoutries');
    },
    data() {
        return {
            isOtherCity : false,
        }
    },

    computed: {
        ...mapGetters('country', {
            countries: 'getCountries',
        }),
    },

    setup() {
        const state = reactive({
            name: '',
            shortName: '',
            city_name: '',
            country_id: 0,
            webSite: '',
        })

        const rules = computed(() => {
            return {
                title: { required: customeMessage('title', 'required') },
                order: { required: customeMessage('order', 'required') }
            }
        })

        const v$ = useVuelidate(rules, state);
        return { state, v$ }
    },

    components: { SubmitBtnComponent },

}
</script> 
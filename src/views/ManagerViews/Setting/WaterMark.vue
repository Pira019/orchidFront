<template>
    <div>
        <h2 class="text-center">Filigrane principale <span class="text-success">Orchid-campus</span> </h2> 
        
        <Spinner v-if="isloading"></Spinner> 
        <section v-else class="text-center"> 
            <div v-if="waterMark.refType">
                <img   class="w-25 bg-dark mt-3 img-fluid" :src="waterMark.image.url" alt="Filigrane principale Orchid-campus img">
               <p class="mt-3"><span class="text-muted">Dérriere modification : {{ dateFormate}}</span></p> 
            </div>
            <p v-else class="h3">Absence de filigrane enregistrée</p>
           
        </section> 
        
    </div>
    
</template>

<script>
import Spinner from '@/components/shared/Spinner.vue';
import { WaterMark } from '@/model/WaterMark';
import formattedDate from '@/Utils/formattedDate';
import { navigateToRoute } from '@/Utils/Navigation';

 
export default{
    data() {
        return {
            waterMark: WaterMark,
            isloading : false,
        };
    },
    computed: {
        dateFormate() {
            return formattedDate(this.waterMark.updated_at);
        },
    },
    mounted() {
        this.isloading = true;
        this.$store.dispatch('settingManager/getWatermark')
            .then((response) => {
                this.waterMark = response.data;

            }).catch((error) => {
                navigateToRoute.call(this, error.response.status, 'manager403');

            }).finally(() => {
                this.isloading = false;
            });
    },
    components: { Spinner }
}
</script>

<template>
    <div>
        <page-title>
            Nos services
            <template #content v-if="showServiceDetailHeader"> 
                <!-- Show detail service-->
                <ServiceDetailHeader :service="service"></ServiceDetailHeader>
            </template>
        </page-title> 
        <Spinner class="mt-5" v-if="isDataLoading"></Spinner>
        <router-view v-show="!isDataLoading"></router-view> 
    </div>
</template>

<script>
import PageTitle from '@/components/shared/Manager/PageTitle.vue';
import ServiceDetailHeader from '@/components/shared/Manager/Service/ServiceDetailHeader.vue';
import Spinner from '@/components/shared/Spinner.vue';
import { mapGetters } from 'vuex';
export default{
    computed: {
        ...mapGetters('serviceManager', {
            isDataLoading: 'isDataLoadingState',
            showServiceDetailHeader: 'toggleServiceDetailHeader',
            service: 'getService'
        })
    },
    components: { PageTitle,Spinner,ServiceDetailHeader},
}
</script>
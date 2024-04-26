<template>
    <div >
        <page-title>
            Nos services
            <template #content v-if="showServiceDetailHeader"> 
                <!-- Show detail service-->
                <ServiceDetailHeader :service="service" class="mt-3"></ServiceDetailHeader>
            </template>
        </page-title> 
        <Spinner class="mt-5" v-if="isDataLoading"></Spinner>
        <request-alert class="container-fluid" :isSucceed="false" :responseMessage="requestResponse" v-show="!isDataLoading && requestResponse "></request-alert>
        <router-view v-show="!isDataLoading" :requestResponse="requestResponse"></router-view> 
 
    </div>
</template>

<script>
import PageTitle from '@/components/shared/Manager/PageTitle.vue';
import ServiceDetailHeader from '@/components/shared/Manager/Service/ServiceDetailHeader.vue';
import Spinner from '@/components/shared/Spinner.vue';
import { mapGetters } from 'vuex';
import RequestAlert from '@/components/shared/Alert/RequestAlert.vue';
export default{
    computed: {
        ...mapGetters('serviceManager', {
            isDataLoading: 'isDataLoadingState',
            showServiceDetailHeader: 'toggleServiceDetailHeader',
            service: 'getService',
            requestResponse: 'geResponseMessage',
        })
    },
 
    components: { PageTitle,Spinner,ServiceDetailHeader,RequestAlert},
}
</script>,
        
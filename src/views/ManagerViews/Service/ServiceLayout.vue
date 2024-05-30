<template>
    <div >
        <page-title :isLoading="isDataLoading" :requestResponseMessage="requestResponse">
            {{ pageTitle }}
            <template #content v-if="showServiceDetailHeader"> 
                <!-- Show detail service-->
                <ServiceDetailHeader :service="service" class="mt-3"></ServiceDetailHeader>
            </template>
        </page-title> 
       
        <router-view v-show="!isDataLoading" :requestResponse="requestResponse"></router-view> 
 
    </div>
</template>

<script>
import PageTitle from '@/components/shared/Manager/PageTitle.vue';
import ServiceDetailHeader from '@/components/shared/Manager/Service/ServiceDetailHeader.vue'; 
import { mapGetters } from 'vuex'; 
export default{ 
    computed: {
        ...mapGetters('serviceManager', {
            isDataLoading: 'isDataLoadingState',
            showServiceDetailHeader: 'toggleServiceDetailHeader',
            service: 'getService',
            requestResponse: 'geResponseMessage',
            pageTitle: 'getPageTitle',
        })
    },
 
    components: { PageTitle,ServiceDetailHeader},
}
</script>,
        
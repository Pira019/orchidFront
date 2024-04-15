<template>
    <div>
        <page-title>Nos services</page-title> 
        <Spinner class="mt-5" v-if="isDataLoading"></Spinner>
        <router-view v-show="!isDataLoading"></router-view> 
    </div>
</template>

<script>
import PageTitle from '@/components/shared/Manager/PageTitle.vue';
import Spinner from '@/components/shared/Spinner.vue';
import { mapGetters } from 'vuex';
export default{
    computed: {
        ...mapGetters('serviceManager', {
            isDataLoading: 'isDataLoadingState'
        })
    },
    components: { PageTitle,Spinner},
}
</script>
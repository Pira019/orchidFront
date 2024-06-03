<template>
  <div>
    <div>
      <page-title :isLoading="isDataLoading" :requestResponseMessage="requestResponse">
        {{ pageTitle || 'Universités' }}
      </page-title>
    </div>
    <router-view v-show="!isDataLoading && !requestResponse" :requestResponse="requestResponse"></router-view>
  </div> 
</template>

<script>
import PageTitle from '@/components/shared/Manager/PageTitle.vue';
import { mapGetters } from 'vuex';
export default {
  components: { PageTitle }, 
  computed: {
        ...mapGetters('ManagerStore', {
            isDataLoading: 'isDataLoading',
            requestResponse: 'requestResponse', 
            pageTitle: 'getPageTitle', 
        })
    },
  
};
</script>
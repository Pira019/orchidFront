<template>
  <div>
  <div>
    <page-title>
      Universités
    </page-title>
  </div>

  <router-view></router-view>
</div>
</template>

<script>
import PageTitle from '@/components/shared/Manager/PageTitle.vue';
export default {
  components: { PageTitle }, 
};
</script>
<template>
    <div class="container-fluid">
      <h1>Header</h1> 
      <router-view class="mt-5"></router-view> 
    </div> 
 
</template>

<script>
import HeaderTuto from '@/components/managerComponents/HeaderTuto.vue'
export default {
  components: { HeaderTuto },
    name: "ManagerTutoHome"
}
</script>
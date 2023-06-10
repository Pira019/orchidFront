<template> 
    <BaseLayout>
        <template #header>
            <ManagerMenu @isSidebarActive="isSidebarActive"></ManagerMenu>
        </template>       
        <ManagerSlidebar :isSidebarActive="isSidebarActive__">
            <template #content> 
                <!--content--> 
                    <slot></slot> 
            </template>
        </ManagerSlidebar>       
    </BaseLayout> 
</template>
<script>
import BaseLayout from '../BaseLayout.vue';
import ManagerMenu from './ManagerMenu.vue';
import ManagerSlidebar from './ManagerSlidebar.vue'; 

export default {
  data () {
    return {
        isSidebarActive__:false
    }
  },
  methods: {
    isSidebarActive(isSidebarActive_){
        this.isSidebarActive__=isSidebarActive_;
    }
  },
    name: "ManagerLayout",
    components: { BaseLayout, ManagerSlidebar, ManagerMenu, ManagerSlidebar }
}
</script>  
<style  src="@/assets/css/sb-admin-2.min.css">
</style>
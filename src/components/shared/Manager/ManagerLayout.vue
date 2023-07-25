<template>
    <BaseLayout v-if="userAuth">
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

    <!--redirect to login-->
    <BaseLayout else>
        <slot></slot>
    </BaseLayout>
</template>
<script>
import BaseLayout from '../BaseLayout.vue';
import ManagerMenu from './ManagerMenu.vue';
import ManagerSlidebar from './ManagerSlidebar.vue';

export default {
    data() {
        return {
            isSidebarActive__: false,
            userAuth: localStorage.getItem('authUserToken')
        }
    },
    methods: {
        isSidebarActive(isSidebarActive_) {
            this.isSidebarActive__ = isSidebarActive_;
        }
    },
    name: "ManagerLayout",
    components: { BaseLayout, ManagerSlidebar, ManagerMenu, ManagerSlidebar }
}
</script>  
<style  src="@/assets/css/sb-admin-2.min.css"></style>
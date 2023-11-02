<template>
    <BaseLayout v-if="isAuth && !is403Route()">
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
    <BaseLayout v-else>
        <slot></slot>
    </BaseLayout>
</template>
<script>
import { mapGetters } from 'vuex';
import BaseLayout from '../BaseLayout.vue';
import ManagerMenu from './ManagerMenu.vue';
import ManagerSlidebar from './ManagerSlidebar.vue';

export default {

    props: {
        showSidebar_:{ 
            type: Boolean,
        }
    },
    data() {
        return {
            isSidebarActive__: false, 
        }
    },
    methods: {
        isSidebarActive(isSidebarActive_) {
            this.isSidebarActive__ = isSidebarActive_;
        }, 

        is403Route() {
            const routeName = this.$route.name;
            return routeName === import.meta.env.VITE_ROUTE403 ||  routeName === import.meta.env.VITE_ROUTELOGIN; // Check if the route is '403'
            },
 
    },

    computed: {
        ...mapGetters('authManager', {
            isAuth: 'isAuth', 
        }),
 
    },
    
    mounted(){ 
 
        const storedToken = localStorage.getItem('authUserToken');
        const storedName = localStorage.getItem('authUserName');

        if (storedToken && storedName) {
            this.userAuth = true; 
            this.$store.commit('authManager/userAuth', { token: storedToken, name: storedName });
        }

    },
    name: "ManagerLayout",
    components: { BaseLayout, ManagerSlidebar, ManagerMenu, ManagerSlidebar }
}
</script>  
<style  src="@/assets/css/sb-admin-2.min.css"></style>
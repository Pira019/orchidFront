<template>
    <BaseLayout v-if="userAuth?.authUserToken">
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
    data() {
        return {
            isSidebarActive__: false,
            userAuth: false
        }
    },
    methods: {
        isSidebarActive(isSidebarActive_) {
            this.isSidebarActive__ = isSidebarActive_;
        }, 
    },

    computed: {
        ...mapGetters('authManager', {
            userAuthToken: 'getUserAuth'
        }),
 
    },
    
    created(){      

        this.userAuth = this.userAuthToken;

        if(!this.userAuth?.authUserToken){
            this.$store.commit('authManager/userAuth',{token : localStorage.authUserToken, name : localStorage.authUserName});
        }
    },
    name: "ManagerLayout",
    components: { BaseLayout, ManagerSlidebar, ManagerMenu, ManagerSlidebar }
}
</script>  
<style  src="@/assets/css/sb-admin-2.min.css"></style>
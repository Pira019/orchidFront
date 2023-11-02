<template>
    <!--Menu-->
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <!-- Sidebar Toggle-->
        <button class="btn btn-link btn-sm" id="sidebarToggle" @click="toggleSidebar">
            <font-awesome-icon icon="fa-bars" class="m-1" size="2x" style="color: #fafafa;"></font-awesome-icon>
        </button>
        <router-link class="navbar-brand" :to="{ name: 'managerHome' }">
            <img src="@/assets/img/svg/logoOrchid.svg" class="img-fluid" width="80" height="20" alt="logo orchid campus">
        </router-link>
        <ul class="navbar-nav ms-auto">
            <li class="nav-item text-white">{{ userAuthToken.authUserName }}</li>
        </ul>
        <ul class="navbar-collapse navbar-nav ms-auto ms-md-0 me-3 me-lg-4 justify-content-end">
            <li class="nav-item">
                <router-link :to="{ name: 'managerHome' }" class="nav-link position-relative" title="Nouveaux dossiers">
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        99+
                        <span class="visually-hidden">unread messages</span>
                    </span>
                    <font-awesome-icon icon="fa-regular fa-folder-open"></font-awesome-icon>
                </router-link>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false"><i class="fas fa-user fa-fw"></i>dddd</a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#!">Settings</a></li>
                    <li><a class="dropdown-item" href="#!">Activity Log</a></li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <li><a class="dropdown-item" @click="logout">Déconnection</a></li>
                </ul>
            </li>
        </ul>
    </nav>
</template>
<script>
import { mapGetters } from "vuex";

export default ({
    props: {
    },
    data() {
        return {
            isSidebarActive: false, 
        }
    },
    methods: {
        toggleSidebar() {
            this.isSidebarActive = !this.isSidebarActive;
            this.$emit('isSidebarActive', this.isSidebarActive)
        },

        logout() {
            localStorage.removeItem("authUserToken");
            this.$store.commit('authManager/userAuth', { token: '' });
            this.$router.push({ name: 'managerLogin' });
        }
    },

    computed: {
        ...mapGetters('authManager', {
            userAuthToken: 'getUserAuth'
        })
    }
    ,

    name: "ManagerMenu",
})

</script>

<style></style>

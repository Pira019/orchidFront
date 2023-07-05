<template>
    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar" :class="{ active: isSidebarActive }">

            <ul class="nav flex-column">
                <li class="nav-item ">
                    <a class="nav-link m-1 fw-bold " href="#">Active</a>
                </li> 
                <li>
                     
                    <a data-toggle="collapse" aria-expanded="false" href="#homeSubmenu"  class="nav-link m-1 fw-bold dropdown-toggle">
                        <font-awesome-icon icon="fa-person-chalkboard" size="1x"/>
                        <span class="px-2">Tutoriels</span>
                    </a>
                    <ul class="collapse list-unstyled" id="homeSubmenu">
                        <li class="nav-item">
                            <router-link class="nav-link fw-bold" :to="{name:'ManagerCountries'}">Procédure par pays</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link fw-bold" href="#">Universités</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link fw-bold" href="#">Procédure par pays</a>
                        </li>
                         
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link m-1 fw-bold " href="#">Link</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link m-1 fw-bold " href="#">Disabled</a>
                </li>
            </ul> 
        </nav>

        <!-- Page Content  -->
        <div id="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isSidebarActive: Boolean
    },
    name: 'ManagerSlidebar'
}
</script>  
<style scope>
#homeSubmenu li a{
    background-color: transparent
}
</style>
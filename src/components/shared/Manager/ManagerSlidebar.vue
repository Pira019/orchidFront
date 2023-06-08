<template>
    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar" :class="{ active: isSidebarActive }">

            <ul class="nav flex-column">
                <li class="nav-item ">
                    <a class="nav-link m-1 fw-bold " href="#">Active</a>
                </li>
                <li class="nav-item "> 
                    <router-link class="nav-link m-1 fw-bold " :to="{name:'ManagerTutoHome'}">
                        <font-awesome-icon icon="fa-person-chalkboard" size="1x"/>
                        <span class="px-2">Tutoriels</span>
                    </router-link>
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
<template>
    <div class="wrapper">
        <!-- Sidebar  -->
        <nav id="sidebar" :class="{ active: isSidebarActive }">

            <ul class="nav flex-column">
                <li class="nav-item ">
                    <a class="nav-link m-1 fw-bold " href="#">Active</a>
                </li> 
                <li class="nav-item">
                    <router-link class="nav-link fw-bold" :to="{name:'ManagerCountries'}"> <font-awesome-icon icon="fa-list" size="1x"/><span class="px-2"> Etape par pays</span> </router-link>
                </li> 
                <li>                     
                    <a data-toggle="collapse" aria-expanded="false" href="#homeSubmenu" :class="{active : isActive('homeSubmenu')}"  class="nav-link m-1 fw-bold dropdown-toggle">
                        <font-awesome-icon icon="fa-person-chalkboard" size="1x"/>
                        <span class="px-2">Tutoriels</span>
                    </a>
                    <ul class="collapse list-unstyled" id="homeSubmenu" @click="handleActiveStyleClick">
                        <li class="nav-item">
                            <router-link class="nav-link fw-bold" :to="{name:'ManagerTutoCountry'}"> <font-awesome-icon icon="fa-globe" size="1x"/><span class="px-2"> Par pays </span></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link fw-bold" :to="{name:'ManagerUniversite'}">  <font-awesome-icon icon="fa-school" size="1x"/> <span class="px-2"> Universités </span></router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link fw-bold" href="#">Procédure par pays</a>
                        </li>
                         
                    </ul>
                </li>
                <!--Manager user-->
               
                 <!---->
                <li class="nav-item">
                    <a class="dropdown-toggle nav-link m-1 fw-bold" :class="{active : isActive('serviceMenu')}" href="#serviceMenu"  data-toggle="collapse" aria-expanded="false" ><font-awesome-icon icon="fa-solid fa-gear" /> Services</a>
                    <ul class="collapse list-unstyled" id="serviceMenu" @click="handleActiveStyleClick">
                        <li class="nav-item">
                            <router-link  class="nav-link fw-bold" :to="{name:'ManagerService'}"> <font-awesome-icon icon="fa-briefcase" size="1x"/><span class="px-2"> Nos services </span></router-link>
                            <a  class="nav-link fw-bold" :to="{name:'ManagerService'}"> <font-awesome-icon icon="fa-briefcase" size="1x"/><span class="px-2"> Statistiques </span></a>
                            <a  class="nav-link fw-bold" :to="{name:'ManagerService'}"> <font-awesome-icon icon="fa-briefcase" size="1x"/><span class="px-2"> Historique </span></a> 
                        </li>
                        
                         
                    </ul>
                </li>

                <li>                     
                    <a data-toggle="collapse" aria-expanded="false" href="#setting" :class="{active : isActive('setting')}" class="nav-link m-1 fw-bold dropdown-toggle">
                        <font-awesome-icon icon="fa-person-chalkboard" size="1x"/>
                        <span class="px-2">Paramètres</span>
                    </a>
                    <ul class="collapse list-unstyled" id="setting" @click="handleActiveStyleClick">
                        <li class="nav-item">
                            <router-link class="nav-link fw-bold" :to="{name:'Managerwatermark'}"> <font-awesome-icon icon="fa-signature" size="1x"/><span class="px-2"> Watermark </span></router-link>
                        </li> 
                        <li class="nav-item">
                            <router-link class="nav-link fw-bold" :to="{name:'ManagerPaiement'}"> Paiement </router-link>
                        </li> 
                    </ul>
                </li>

                <li class="nav-item">
                    <router-link  class="nav-link fw-bold" :to="{name:'ManagerUserProfile'}"><font-awesome-icon icon="fa-solid fa-user"></font-awesome-icon><span class="px-2"> Profil </span></router-link>

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
  data () {
    return {
        collabseBtnActive : false,
    }
  },
  methods: {
    handleActiveStyleClick(event){ 
        this.collabseBtnActive = event.currentTarget.id
  // return idUlCollapse;
  },
  isActive(idToCheck) {
      return this.collabseBtnActive === idToCheck;
    }
  },
    props: {
        isSidebarActive: Boolean
    },
    name: 'ManagerSlidebar'
}
</script>  
<style scope>
#sidebar li a{
    background-color: transparent
}
</style>
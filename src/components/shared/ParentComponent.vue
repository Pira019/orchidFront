<template> 
    <BaseLayout v-if="!showManager">
        <template #header>
            <Menu></Menu>          
        </template>
        <slot></slot>
        <template #footer>
            <Footer></Footer>            
        </template>
    </BaseLayout>     
    <!--Manager template-->
    <manager-layout  v-else>
      <slot></slot>
    </manager-layout> 
</template>

<script>
import BaseLayout from './BaseLayout.vue';
import Footer from './footer/Footer.vue'; 
import ManagerLayout from './Manager/ManagerLayout.vue';
import Menu from './Menu/Menu.vue';


export default{
  data () {
    return {
        showManager : false,
    }
  }, 
  watch: {
    //show the manager menu if url contain /manager and exists
    '$route.path'(newPath) {
       const test= newPath.includes(import.meta.env.VITE_MANAGER_PATH);
      const routeExists = this.$router.options.routes.some(
        (route) => route.path.includes(import.meta.env.VITE_MANAGER_PATH)
      );
      this.showManager = test && routeExists
    },
},
    name: "ParentComponet",
    components: { BaseLayout, Footer, Menu, ManagerLayout }
}
</script>

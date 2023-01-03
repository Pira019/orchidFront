<template> 
    <BaseLayout>
        <template #header>
            <Menu></Menu>
        </template>
        <slot></slot>
        <template #footer>
            <Footer></Footer>            
        </template>
    </BaseLayout>
</template>

<script>
import BaseLayout from './BaseLayout.vue';
import Footer from './footer/Footer.vue';
import Menu from './Menu/Menu.vue';


export default{
    name: "ParentComponet",
    components: { BaseLayout, Footer, Menu }
}
</script>

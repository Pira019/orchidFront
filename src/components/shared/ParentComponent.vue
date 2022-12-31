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
import Footer from './Footer.vue';
import Menu from './Menu.vue';

export default{
    name: "ParentComponet",
    components: { BaseLayout, Menu, Footer }
}
</script>

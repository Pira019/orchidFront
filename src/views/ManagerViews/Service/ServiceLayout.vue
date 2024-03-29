<template>
    <div>
        <page-title>Nos services</page-title> 
        <router-view></router-view>
    </div>
</template>

<script>
import PageTitle from '@/components/shared/Manager/PageTitle.vue';
export default{
    components: { PageTitle},
}
</script>
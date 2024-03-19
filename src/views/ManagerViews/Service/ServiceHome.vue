<template> 

        <router-link :to="{name:'ManagerServiceAdd'}" class="btn btn-success">Ajouter</router-link>  
   
</template>

<script>
import PageTitle from '@/components/shared/Manager/PageTitle.vue';
export default{
    components: { PageTitle},
}
</script>
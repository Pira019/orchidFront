<template>
 
    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical"> 
        <p class="fw-bold">Etapes:</p>
        <a class="nav-link text-black"  v-for="(item, index) in data" :key="index" :href="'#tab' + index" data-toggle="pill" role="tab" aria-selected="false" @click="$emit('getStep', item)">          
            <span class="fw-bold">  Etape {{ item.order }}</span>
        </a>
   
    </div>
</template>

<script>
export default { 
 
    props : {
        title:{},
        data : {
            type:Array
        }
    },
}
</script>

<style scoped>
.nav-pills .active {
    background-color: #00874E;
    color:white !important;
}

</style> 
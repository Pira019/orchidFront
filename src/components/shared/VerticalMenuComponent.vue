<template>

    <div class="nav flex-column nav-pills " id="v-pills-tab" role="tablist" aria-orientation="vertical">  
        <h1 class="text-muted h2">Etape</h1>    
        <div v-for="(data,index) in data" :key="index">
            <a class="nav-link fw-bold mr-3 nav-tabs" :id="'tab'+index" :title="data?.title" @click="$emit('getStep',data)" data-toggle="pill" role="tab" aria-contaria-selected="false">Etape {{ data.order }}</a>  
        </div>           
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
<template>
    <div class="row text-secondary" v-if="service">
        <div class="col-md">
            <p class="h5" title="prix"> <font-awesome-icon icon="circle-dollar-to-slot" /><span class="px-2">{{ service.price}}</span></p> 
        </div>
        <div class="col-md" >
            <p title="Année" class="h5"> <font-awesome-icon icon="calendar" /> <span class="px-2">{{ service.year}}</span></p> 
        </div>
        <div class="col-md">
            <p title="Date de création" class="h5"> <font-awesome-icon icon="folder-plus" /> <span class="px-2">{{ service.created_at}}</span></p> 
        </div>         
        <div class="col-md">
            <p title="Dérniere modification" class="h5"> <font-awesome-icon icon="pen-to-square" /> <span class="px-2">{{ service.updated_at}}</span></p> 
        </div>         
        <div class="col-md">
            <p title="Status" class="h5"> <font-awesome-icon icon="pen-to-square" /> <span class="px-2">{{ service.status}}</span></p> 
        </div>         
    </div>
</template>

<script>  
export default{
  props: {
    service : { 
        required : true
    }
  },

}
</script>
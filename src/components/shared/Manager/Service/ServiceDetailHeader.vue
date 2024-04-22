<template>
    <div class="row text-secondary" v-if="service">
        <div class="col-md">
            <p class="h5" title="prix"> <font-awesome-icon icon="circle-dollar-to-slot" /><span class="px-2">{{ service.price}} $</span></p> 
        </div>
        <div class="col-md" >
            <p title="Année" class="h5"> <font-awesome-icon icon="calendar" /> <span class="px-2">{{ service.year}}</span></p> 
        </div>
        <div class="col-md">
            <p title="Date de création" class="h5"> <font-awesome-icon icon="folder-plus" /> <span class="px-2">{{ formatDate(service.created_at)}}</span></p> 
        </div>         
        <div class="col-md">
            <p title="Dérniere modification" class="h5"> <font-awesome-icon icon="pen-to-square" /> <span class="px-2">{{ formatDate(service.updated_at)}}</span></p> 
        </div>         
        <div class="col-md">
            <p title="Status" class="h5" :class="getStatusColor(service.status)"> <font-awesome-icon icon="signal" /> <span class="px-2">{{ service.status}}</span></p> 
        </div>         
    </div>
</template>

<script>  
import formattedDate from '@/Utils/formattedDate';
import {getColorForStaus} from '@/Utils/statusColor.js'
export default{
  props: {
    service : { 
        required : true
    }
  },
  methods: {
    formatDate(date){
        return formattedDate(date)
    },
    getStatusColor(status){
        return getColorForStaus(status)
    }
  }

}
</script>
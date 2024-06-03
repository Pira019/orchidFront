<template>
    <section class="border-bottom mb-3">
        <h1 class="text-success fw-bolder">
            <slot></slot>
        </h1>
        <slot name="content" class="mb-2"></slot>
    </section>
    <div>
        <Spinner v-if="isLoading"></Spinner>
        <request-alert class="container-fluid" :isSucceed="false" :responseMessage="requestResponseMessage" v-show="!isLoading && requestResponseMessage"></request-alert>
    </div>
    
</template>

<script> 
import RequestAlert from '../Alert/RequestAlert.vue'
import Spinner from './../Spinner.vue'
export default {
    components: { Spinner, RequestAlert },
    props : {
        isLoading :{
            type:Boolean
        },
        requestResponseMessage : {
            type : String
        }, 
        
    },
  
}
</script>
<template >
       <div class="alert alert-danger" role="alert" v-if="show"> 
         <h4 class="alert-heading"><slot>Impossible d'enregistrer le tutoriel</slot></h4>
         <p>{{ response }}</p>
        </div>
</template>

<script>
export default {
    props : {         
        show: {
            default : false,
            type : Boolean
        },
        response : { 
            required : true
        }
    },
    name : 'SuccessAlert'
}
</script>
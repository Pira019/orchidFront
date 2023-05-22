<template >
       <div class="alert alert-success" role="alert" v-if="show"> 
         <h4 class="alert-heading">Réinitialisation du mot de passe</h4>
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
            default : '',
            required : true
        }
    },
    name : 'SuccessAlert'
}
</script>
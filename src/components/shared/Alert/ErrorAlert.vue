<template >
    <!--Alert error-->
       <div class="alert alert-danger" role="alert" v-if="show"> 
            <div v-for="(errorArray,field ) of response" :key="field">
              <p v-for="(allErrors, index) in errorArray" :key="index">
                <span>{{ allErrors}}</span>
              </p>
            </div> 
        </div>
         <!--End of Alert error-->
</template>

<script>
export default {
    props : {         
        show: {
            default : false,
            type : Boolean
        },
        response : {
            default : null,
            required : true
        }
    },
    name : 'ErrorAlert'
}
</script>
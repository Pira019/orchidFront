<template >
    <!--Alert error-->
       <div class="alert alert-danger" role="alert" v-if="show"> 
            <div v-for="(errorArray,index) of response" :key="index" >
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
            default : '',
            required : true
        }
    },
    name : 'ErrorAlert'
}
</script>
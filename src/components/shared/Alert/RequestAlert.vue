<template> 
    <div>
        <div :class="[ isSucceed ? 'alert-success' : 'alert-danger']" class="alert" role="alert">
            <h4 class="alert-heading">
                <slot>{{ responseMessage }}</slot>
            </h4> 
        </div> 
    </div>
</template>

<script>
export default {
    props: {
        isSucceed: {
            type: Boolean
        },
        responseMessage: { 
            type : String
        }
    },
}
</script>
<template>
    <div class="container">
        <div class="text-center">
            <h1 class="text-success">Modifier le mot de passe</h1> 
        </div>
        <form-update-password class="mt-3"></form-update-password>
    </div>
</template>

<script>
import FormUpdatePassword from '@/views/CustomerViews/UpdatePassword/FormUpdatePassword.vue' 
export default ({

    name: 'UpdatePassword',
    components: { FormUpdatePassword},

})
</script>
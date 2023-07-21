<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-6">
                <div class="mb-4">
                    <img :src="logo" alt="" class="img-thumbnail mx-auto d-block mb-4" width="100">
                    <h1 class="text-success text-center">Bienvenue sur Orchid-Campus</h1>
                </div>
                <form action="">
                    <div class="mb-3">
                        <label for="noId" class="form-label">No indentification</label>
                        <input type="text" class="form-control" id="noId">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Mot de passe</label>
                        <input type="password" class="form-control" id="password">
                    </div>

                    <div>
                        <a href="">Mot de passe oublié ou prémiere connexion ?</a>
                    </div>
                    <div class="mt-4">
                        <SubmitBtnComponent class="btn btn-success">Connecter</SubmitBtnComponent>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';
import logoOrchid from '@/assets/img/svg/logoOrchidGreen.svg';
export default {
    data() {
        return {
            logo: logoOrchid
        }
    },
    components: { SubmitBtnComponent }
}
</script>
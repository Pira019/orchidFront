<template>
    <div>
        <div>
            <h1 class="text-success">Bienvenue</h1>
            <router-link :to="{name:'home'}" class="text-decoration-none font-weight-bold text-success">Mot de passe oublié</router-link>
        </div>        
        <div class="mt-5">
            <form action="">
                <div class="form-group input-group-lg mb-3 col-10">
                    <label for="email" class="my-1">Email</label>
                    <input type="email" required class="form-control rounded-0" id="email" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="Entrer votre email"> 
                </div>

                <div class="form-group input-group-lg mb-3 col-10">
                    <label for="password" class="my-1">Mot de passe</label>
                    <input type="password" required class="form-control rounded-0" id="password" aria-label="Large" aria-describedby="inputGroup-sizing-sm" placeholder="**********"> 
                </div>

                <div class="form-group mb-3 col-10 d-lg-flex justify-content-between">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="flexCheck">
                        <label class="form-check-label" for="flexCheck">
                            Se souvenir
                        </label>
                    </div>
                    <div>
                       <router-link :to="{name:'home'}" class="text-decoration-none font-weight-bold text-success">Mot de passe oublié ?</router-link>
                    </div>
                </div>

                <div class="form-group input-group-lg mb-3 col-10">
                    <submit-btn-component class="btn btn-success">Connecter</submit-btn-component>
                </div>
            </form>
        </div>
    </div>    
</template>

<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue'
export default {
  components: { SubmitBtnComponent },
    name : 'FormLogin'
}
</script>
<template>
    <div>
     <form action="">
        <div class="row mb-3 no-gutter">
            <div class="col">
                <input type="text" class="form-control rounded-0" placeholder="Prénom">
            </div>
            <div class="col">
                <input type="text" class="form-control rounded-0" placeholder="Nom">
            </div>
        </div>

        <div class="row mb-3">
            <div class="col">
                <select class="form-select form-control rounded-0">
                    <option selected disabled>Sexe ...</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option> 
                </select> 
            </div>
            <div class="col">
                <input type="text" class="form-control rounded-0" placeholder="Date de naissance" onfocus="(this.type='date')" onblur="this.type='text'">
            </div>
        </div>     
        
        <div class="row mb-3">
            <div class="col">
                <select class="form-select form-control rounded-0">
                    <option selected>Pays de résidence ...</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option> 
                </select> 
            </div>
            <div class="col">
                <select class="form-select form-control rounded-0">
                    <option selected>Pays de la citoyenneté ...</option>
                    <option value="M">Masculin</option>
                    <option value="F">Féminin</option> 
                </select> 
            </div>
        </div>

        <div class="row mb-3">
            <div class="col">
                <input type="text" class="form-control rounded-0"  placeholder="Télephone">
            </div>            
        </div>

        <div class="row mb-3">
            <div class="col">
                <input type="email" class="form-control rounded-0"  placeholder="Email">
            </div>            
        </div>

        <div class="row mb-3 no-gutter">
            <div class="col input-group">
                <input type="password" class="form-control rounded-0" placeholder="Mot de passe"> 
            </div>
            <div class="col">
                <input type="password" class="form-control rounded-0" placeholder="Confirmer le mot de passe">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <SubmitBtnComponent class="btn btn-success">Créer mon compte</SubmitBtnComponent>
            </div>
        </div>
       
     </form> 
    </div>

</template>
<script>
import SubmitBtnComponent from '@/components/shared/SubmitBtnComponent.vue';

export default{
    name: "RegisterForm",
    components: { SubmitBtnComponent }
}
</script>
<template>
    <div class="container">
        <h1>403 - Accès Interdit</h1>
        <p>Vous n'avez pas la permission d'accéder à cette page.</p>
        <p>Si vous pensez qu'il s'agit d'une erreur, veuillez contacter l'administrateur du site.</p>

        <div>
            <router-link :to="{name : 'managerLogin'}" class="btn btn-danger">Se connecter à  nouveau</router-link>
        </div>
    </div> 
</template>
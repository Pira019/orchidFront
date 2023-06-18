<template>
    <div>
        <h1 class="text-success fw-bold">Ajouter un tutoriel</h1>

        <div class="mt-5 container-fluid">
            <nav class="nav nav-pills nav-justified nav-tabs">
                <router-link class="nav-item nav-link fw-bold" :to="{ name: 'ManagerAddTutorielCountry' }">Pays</router-link>
                <router-link class="nav-item nav-link fw-bold" disable :to="{ name: 'ManagerAddTutorielSteps' }">Procedure génerale(Nom pays)</router-link>
                <a class="nav-item nav-link" href="#">Université</a>
            </nav>

            <router-view class="mt-3"></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: "AddTutorial",
    mounted() {
        //redirect to the first form
        this.$router.push({ name: 'ManagerAddTutorielCountry' })
    }
}


</script>  
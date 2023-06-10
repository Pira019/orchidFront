<template>
    <div class="container-fluid">
        <header-tuto></header-tuto>
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="..." alt="Drapeau pays">
            <div class="card-body">
                <h5 class="card-title">Nom pays</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                    content.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Nombre d'étudiants</li>
                <li class="list-group-item">Date de publication :</li>
                <li class="list-group-item">Date Création :</li>
                <li class="list-group-item">Dérniere modification :</li>
            </ul>
            <div class="card-body">
                <a href="#" class="btn btn-success">Go somewhere</a>
            </div>
        </div>
        
    </div>
</template>

<script>
import HeaderTuto from '@/components/managerComponents/HeaderTuto.vue'
export default {
  components: { HeaderTuto },
    name: "ManagerTutoHome"
}
</script>
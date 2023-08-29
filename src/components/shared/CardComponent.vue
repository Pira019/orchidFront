<template>
     <div class="container-fluid"> 
        <div class="row justify-content-evenly" v-if="list.lenght !== 0">
            <div class="card col-md-4 mb-3" v-for="(list, index) in list" :key="index" style="width: 18rem;">
                <img class="card-img-top" src="" alt="Drapeau pays">
                <div class="card-body">
                    <h5 class="card-title">{{ list?.name }}</h5>
                    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                    content.</p>-->
                </div>
                <ul class="list-group list-group-flush">

                    <li class="list-group-item">
                        <slot>Nombre étape : </slot> <span class="badge bg-dark">  {{ list?.number_of_steps }} </span>
                    </li>
                    <!--<li class="list-group-item">Date de publication :</li>
                <li class="list-group-item">Date Création :</li>
                <li class="list-group-item">Dérniere modification :</li>-->
                </ul>
                <div class="card-body">
                    <router-link :to="{ name: 'ManagerCountrySteps', params:{id: list?.id  } }" class="btn btn-success">Voir les étapes</router-link>              
                </div>
            </div>
            
        </div>

        <div class="row justify-content-evenly" v-else>
             <p>jfjbfj</p>
        </div>
    </div>
</template>

<script>
export default {
  
    props:["list"] 
}
</script>
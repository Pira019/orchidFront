<template>
     <div class="container-fluid"> 
        <div class="row justify-content-evenly" v-if="list.lenght !== 0">
            <div class="card col-md-4 mb-3" v-for="(list, index) in list" :key="index" style="width: 18rem;">
              <img class="card-img-top" :src="list?.flag_url" alt="Drapeau pays" width="200">
                <div class="card-body">
                    <h5 class="card-title" v-if="!onlyHeader">{{ list?.name }}</h5>
                    <router-link  v-if="onlyHeader" :to="{ name: routeName, params:{id: list?.id  } }" class="text-decoration-none text-black fw-bolder">{{ list?.name }}</router-link>  
                </div> 
                <ul class="list-group list-group-flush" v-if="!onlyHeader" >

                    <li class="list-group-item">
                        <slot>Nombre étape : </slot> <span class="badge bg-dark">  {{ list?.number_of_steps }} </span>
                    </li>
                    <!--<li class="list-group-item">Date de publication :</li>
                <li class="list-group-item">Date Création :</li>
                <li class="list-group-item">Dérniere modification :</li>-->
                </ul>
                <div class="card-body"  v-if="!onlyHeader">
                    <router-link :to="{ name: 'ManagerCountrySteps', params:{id: list?.id  } }" class="btn btn-success">Voir les étapes</router-link>              
                </div>  
            </div>            
        </div>

        <div class="row justify-content-evenly" v-else>
             <p>Aucune entrée !!!</p>
        </div>
    </div>
</template>

<script>
export default {
  
    props:{
        list : {},
        routeName : '#',
        onlyHeader : {
            type : Boolean,
            default : false
        }
    }
}
</script>
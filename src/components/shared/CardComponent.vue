<template>
     <div class="container-fluid"> 
        <div class="row justify-content-start" v-if="list.lenght !== 0">
            <div class="col-md-2"  v-for="(list, index) in list" :key="index">
            <div class="card my-2 "  style="width: 15rem;">
              <img class="card img-fluid" :src="list?.flag_url" alt="Drapeau ou logo" style="width: 100%;">
                <div class="card-body text-center">
                    <h5 class="card-title " v-if="!onlyHeader">{{ list?.name }}</h5>
                    <router-link  v-if="onlyHeader" :to="{ name: routeName, params:{id: list?.id  } }" class="text-decoration-none text-black fw-bolder">{{ list?.name }}</router-link>  
                </div>                
                <ul class="list-group list-group-flush" v-if="!onlyHeader || isUniversityList" >

                    <li class="list-group-item">
                        <slot>Nombre étape : </slot> <span class="badge bg-dark">  {{ list?.number_of_steps || list.city.name }} </span>
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
        isUniversityList : {
            default : false
        },
        onlyHeader : {
            type : Boolean,
            default : false
        }
    }
}
</script>
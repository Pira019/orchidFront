<template>
    <div class="row row-cols-1 row-cols-md-3 g-4 my-2">
  <div class="col" v-for="(value,index) in valuesList" :key="index">
    <div class="card h-100">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title text-center text-success">{{ value.tile}}</h5>
        <p class="card-text">{{ value.desc}}</p>
      </div>
    </div>
  </div> 
</div>
</template>

<script>
import values from "./ourValues.json"
export default{
  data () {
    return {
            valuesList :values
        }       
  },

  
    name : 'Our-value'
    
}
</script>
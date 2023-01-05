<template>
    <div class="row row-cols-1 row-cols-md-3 g-4 my-2">
  <div class="col" v-for="value in valuesList">
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
export default{
  data () {
    return {
            valuesList : [{
                tile:'Fialiabilité',
                desc:'Nous prenons très au sérieux l\'exactitude des informations que nous vous fournissons. De ce fait, chacun de nos tutoriels inclut des sources officielles afin que vous puissiez vérifier de manière indépendante les informations qui vous sont fournies.'
            },
            {
                tile:'Efficacité'
            },
            {
                tile:'Intégrité'
            },
        ]
        }       
  },

  mounted() {
        this.valuesList;
    },
    name : 'Our-value'
    
}
</script>
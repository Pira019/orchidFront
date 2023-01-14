<template>
    <div class="container">
        <h1 class="text-center">Contact</h1>

        <p>{{ id }}</p>

        <RouterView></RouterView>
    </div>
</template>

<script>
export default {
  data () {
    return {
        id:this.id
    }
  },
   
    name: "Contact"
}
</script>
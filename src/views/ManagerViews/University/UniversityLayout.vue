<template>
  <section>
    <header class="mb-3">
    <div class="mb-5 justify-content-between d-flex">
      <h1 class="text-success">{{ title }}</h1>
      <div v-if="isShowBtn">
        <router-link
          :to="{ name: 'ManagerUniversiteAdd' }"
          class="btn btn-success"
        >
          <font-awesome-icon icon="fa-plus" size="1x" />Ajouter
        </router-link>
      </div>
    </div>
  </header>
    
  <body class="p-3 border rounded">
    <slot></slot>
  </body>
  </section>
 
</template>

<script>
export default {
  props: {
    title: {
      default: "Liste des Universités",
    },
    isShowBtn: {
      default: false,
    },
  },
};
</script>
<template>
  <div class="container-fluid">
    <section id="header" class="d-flex justify-content-between">
      <h1>{{ headerTitle }}</h1>
      <div>
        <router-link class="btn btn-primary" :to="{ name: 'ManagerAddTutorielCountry' }">Ajouter</router-link>
      </div>
    </section>

    <router-view class="mt-5"></router-view>
  </div>
</template>

<script>
import HeaderTuto from '@/components/managerComponents/HeaderTuto.vue'
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      headerTitle: 'tutorial/getHeaderTitle',
    }),
  },
  components: { HeaderTuto },
  name: "ManagerTutoHome"
}
</script>
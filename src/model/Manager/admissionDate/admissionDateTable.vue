<template>
    <div>
        <table-component>
            <template #TableHeader>
                <th> Lien </th>
                <th> Session admission  </th>
                <th> Date début </th>
                <th> Date fin </th>
                <th>Dernière modification </th>
            </template>
        </table-component>
    </div>
</template>

<script>
import TableComponent from '@/components/shared/TableComponent.vue'
export default{
  components: { TableComponent },
  props: {
    data:{
        type : Array,
        required : true
    }
  },

}
</script>
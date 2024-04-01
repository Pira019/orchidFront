<template>
    <div class="container-fluid">
        <h1>test</h1>

        <div>
            <table-component>
                <template #TableHeader>
                    <th scope="col">Disciplines</th>
                    <th scope="col">Etapes</th> 
                    <th scope="col">Universités</th> 
                    <th scope="col">Action</th>
                </template>
            </table-component>
        </div>
    </div>
</template>

<script>
import TableComponent from '@/components/shared/TableComponent.vue'

export default{
  components: { TableComponent },}
</script>

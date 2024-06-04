<template>
    <div>
        <table-component>
            <template #TableHeader>
                <th> Status </th>
                <th> Lien </th>
                <th> Session admission </th>
                <th> Année </th>
                <th> Date début </th>
                <th> Date fin </th>
                <th>Dernière modification </th>
                <th></th>
            </template>
            <template #TableBody>
                <tr v-for="(item, index) in data" :key="index">
                    <th>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" autocomplete="off" :id="'flexSwitchCheckChecked_' + item.id" :checked="item.active">
                        </div>

                    </th>
                    <th>
                        <a :href="item.link" target="_blank">
                            Lien inscription
                        </a>

                    </th>
                    <th>
                        {{ item.session_admission }}
                    </th>
                    <th>
                        {{ item.year }}
                    </th>
                    <th>
                        {{ item.start_at }}
                    </th>
                    <th>
                        {{ item.end_at }}
                    </th>
                    <th>
                        {{ formattedDate_(item.updated_at) }}
                    </th>
                    <th>
                        <div class="btn-group" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-warning">M</button>
                            <button type="button" class="btn btn-danger">S</button>
                        </div>

                    </th>
                </tr>
            </template>
        </table-component>
    </div>
</template>

<script>
import TableComponent from '@/components/shared/TableComponent.vue'
import formattedDate from '@/Utils/formattedDate'
export default {
    components: { TableComponent },
    props: {
        data: {
            type: Array,
            required: true
        }
    },

    methods: {
        formattedDate_(date) {
            return formattedDate(date);
        }
    }

}
</script>
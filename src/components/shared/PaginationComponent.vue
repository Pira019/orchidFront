<template>
    <div>
        <nav aria-label="pagination">
            <ul class="pagination">
                <li class="page-item text-warning" v-for="(item, index) in links" :key="index"
                    :class="{ active: item.active, disabled: !item.url }">
                    <button @click="onPaginationClicked(getPageNumberByUrl(item.url))" class="page-link" href="#">
                        <font-awesome-icon icon='angles-left' v-if="index === 0" />
                        <font-awesome-icon icon='angles-right' v-if="index === links.length - 1" />
                        <span v-if="(index !== links.length - 1 && index !== 0)"> {{ item.label }}</span>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
    methods: {
        onPaginationClicked(pageNumber) {
            this.$emit('clickOnPagination', pageNumber)
        },
        getPageNumberByUrl(url) {
            return new URL(url).searchParams.get('page');
        }
    },
    props: {
        links: {
            required: true
        },
        current_page: {
            required: true
        },
    },

}
</script>
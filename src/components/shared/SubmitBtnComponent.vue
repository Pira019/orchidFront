<template>
    <button type="submit" v-if="!loading">
        <slot>Envoyer</slot>
    </button>
    <ButtonLoading v-else></ButtonLoading>
</template>

<script>
import ButtonLoading from './ButtonLoading.vue';

export default {
    props: {
        loading: {
            type: Boolean, 
        }
    },
    data() {
        return {};
    },
    name: "BtnSubmit",
    components: { ButtonLoading }
}
</script>
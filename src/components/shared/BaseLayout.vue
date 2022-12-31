<template>     
        <header>
            <slot name="header"></slot>
        </header>
        <main class="bg-primary">
            <slot></slot>
        </main>
        <footer class="bg-success">
            <slot name="footer"></slot>
        </footer>     
</template>

<script>
export default{
    name : 'BaseLayout'
}
</script>

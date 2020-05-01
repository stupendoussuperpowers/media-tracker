<template>
    <div class="item">
        <router-link :to="'/app/'+path"> {{title}} </router-link>
    </div>
</template>

<script>
export default {
    props: ["title", "path"],
}
</script>

<style scoped>
a {
    text-decoration: none;
}

.item{
    font-size: 150%;
}

</style>
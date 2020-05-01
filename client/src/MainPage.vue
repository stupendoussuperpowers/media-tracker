<template>
    <div class="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return {
            router: this.$router
        }
    }
}
</script>

<style scoped>

</style>
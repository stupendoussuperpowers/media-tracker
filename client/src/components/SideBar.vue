<template>
    <div id="app">
        <div class="item-list">
            <SideBarItem v-bind:title="'Music'" v-bind:path="'music'"/>
            <SideBarItem v-bind:title="'Movies & TV Shows'" v-bind:path="'movies'" />
            <SideBarItem v-bind:title="'Books'" v-bind:path="'books'"/>
            <SideBarItem v-bind:title="'Podcasts'" v-bind:path="'podcasts'"/>
        </div>
    </div>
</template>

<script>
import SideBarItem from './SideBarItem.vue';

export default {
    components: {
        SideBarItem
    }
}
</script>

<style scoped>

.item-list {
    margin: 0px 0px 0px 15px;
    align-content: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 75vh;
}

</style>
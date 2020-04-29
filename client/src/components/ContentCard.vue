<template>
    <div id = "card" :style="{ backgroundImage: `url(${content.image})` }">
        <!-- <img id = "header" :src=content.image /> -->
        <div id="background-text">
            <div id = "title">{{content.title}}</div>
            <div id = "time">{{content.time}}</div>
            <div id = "artist">{{content.artist}}</div>
        </div>
    </div>    
</template>

<script>
export default {
    props:["content"]
}
</script>

<style scoped>

#card{
    border: 2px solid black;
    margin: 10px;
    height: 250px;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

#background-text{
    background-color: black;
}

#header{
    height: 100%;
    width: 100%;
}
#title{
    font-size: 100%;
    font-weight: bold;
}
#artist{
    font-size: 100%;
}
#time{
    font-size: 90%;
}
</style>
<template>
    <div id="movieapp">
        <div id="title-bar">My Movie Recommendations</div>
        <div id = "searchbar">
            <AddContent v-on:addContent="addContent" />
        </div>
        <div id="content-gallery">
            <div v-bind:key="content.id" v-for="content in contentList" >
                <ContentCard v-bind:content="content"/>
            </div>
        </div>
    </div>
</template>

<script>
import ContentCard from './ContentCard.vue';
import AddContent from './AddContent.vue';

export default {
    mounted: function(){
        this.getMovies();
    },
    methods: {
        renderList(data){
            this.contentList = data;
            this.rendercomponent = !this.rendercomponent;
        },
        addContent(content){
            console.log("Adding the following:", content);
            fetch('/api/movies/add/', {
                method: 'post',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: content.id,
                    release: content.release,
                    artist: content.artist,
                    poster: content.poster,
                    title: content.title, 
                    user: '9420'
                })
            })
            .then(resp => resp.json())
            .then(data => console.log(data));
            this.getMovies();
        },
        getMovies(){
            fetch('/api/movies/getall/9420')
            .then(resp => resp.json())
            .then(data => {
                this.renderList(data);
            });
        }
    },
    watch: {
        rendercomponent: function(val){
            this.rendercomponent = val;
        }
    },
    data(){
        return {
            contentList: [
                {
                    title: "The French Dispatch",
                    time: "2020",
                    artist: "Wes Anderson",
                    image: "https://truemoviebuff.files.wordpress.com/2020/02/the-french-dispatch.jpg?w=529"
                },
                {
                    title: "Marriage Story",
                    time: "2019",
                    artist: "Noah Baumbach",
                    image: "https://1.bp.blogspot.com/-rv-oOETAbr8/XeqY_jVVbnI/AAAAAAAAN68/eIH4VNsQevAarF9s-vp7X6pzIDwqHg2lQCKgBGAsYHg/s1600/Marriage%2BStory%2BDVD%2BLabel.jpg"
                },
                {
                    title: "Her",
                    time: "2013",
                    artist: "Spike Jonze",
                    image: "https://m.media-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_UX182_CR0,0,182,268_AL__QL50.jpg"
                },
            ],
            rendercomponent: true
        }
    },
    components: {
        ContentCard,
        AddContent
    }
}
</script>

<style scoped>
#movie-app{
    width: 750px;
    height: 100vh;
}

#content-gallery{
    display: grid;
    grid-template-columns: repeat(auto-fit, 250px);
    overflow-y: scroll;
    height: 75vh;
}

#title-bar{
    font-size: 200%;
}
#searchbar{
    width: 80%;
}

</style>
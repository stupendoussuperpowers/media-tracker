<template>
    <div>
        <div id="title">
            <autocomplete :search="search" :get-result-value="getResultValue" @submit="onSubmit">
            </autocomplete>
        </div>
    </div>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue';

export default {
    
    methods:{
        addContent(){
            const newContent = {
                title: this.title,
                time: this.year,
                artist: this.artist,
                image: this.image
            }
            this.$emit('addContent', newContent);
        },
        search(input){
            
            var url = `/search/movies/${input}`

            return new Promise(resolve => {
                if (input.length < 3) {
                    return resolve([])
                }

                fetch(url)
                .then(response => response.json())
                .then(data => {
                    resolve(data)
                })
            })
        },
        getResultValue(result){
            this.newitem = result;
            return result.value;
        },
        onSubmit(result){
            console.log(result);
            fetch(`/movie/${this.newitem.key}`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                this.$emit('addContent', data)
            })
        }
    },
    components: {
        Autocomplete
    },
    data(){
        return {
            title: '',
            year: '',
            artist: '',
            image: '',
            notfetched: true,
            selected: {
                value: '',
                key: ''
            },
            movies: [
                {key: '1', value: 'The Big Sick'},
                {key: '2', value: 'The Martian'},
                {key: '3', value: 'Her'}
            ]
        }
    }
}
</script>

<style scoped>

</style>
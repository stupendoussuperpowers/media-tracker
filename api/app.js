const express = require('express')
const fetch = require('node-fetch')
const app = express()


const API_KEY = "9741dd440ad287c370172aa8f34e2624";

app.get('/movie/:id', async (req, res)  =>  {
    
    console.log("Here We are");

    var movie_id = req.params['id'];

    var item = {
        image: '',
        title: '',
        artist: '',
        time: ''
    }

    item = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`)
    .then(data => data.json())
    .then(data => {
        console.log(data);
        return {
            image: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
            title: data.original_title,
            artist: data.production_companies[0].name,
            time: data.release_date.slice(0,4)
        }
    })

    item.artist = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}`)
    .then(resp => resp.json())
    .then(data => {
        return data.crew.filter((member) => member.job == "Director").map((value) =>  value.name)[0]
    });

    res.send(item)


})

app.get('/search/movies/:keyword', (req, res) => {
    var items = [];

    var query = req.params['keyword']

    console.log(query, "Was made")

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1`)
    .then(data => data.json())
    .then(data => {
        items = data.results.slice(0,5).map((value) => {
            return {
                key: value.id,
                value: `${value.title} (${value.release_date.slice(0,4)})`
            }
        })
        console.log(items);
        res.send(items);
        }
    )
    
    //res.send(items)
})

app.listen(3000, () => console.log("Listening on 3000"))
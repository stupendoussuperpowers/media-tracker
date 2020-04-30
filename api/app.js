const express = require('express')
const fetch = require('node-fetch')
const app = express()
const bodyParser = require('body-parser');
const db = require('./config/mysqlconfig.js')

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({  
  extended: true  
})); 

const API_KEY = "9741dd440ad287c370172aa8f34e2624";

app.post('/add/movie/', async (req, res) => {
    
    //console.log(req);

    if(req.body){
        console.log(req.body)
    }
    else{
        console.log("No Body");
        return;
    }

    db.query(`INSERT INTO movies (id, title, artist, release_year, poster, user) VALUES (?,?,?,?,?,?)`, [
        req.body.id, req.body.title, req.body.artist, req.body.release, req.body.poster, req.body.user
    ]);

    res.send({status:200, msg:"Movie added"});
});

app.get('/get/movies/:user/', async (req, res) => {
    
    console.log("here");

    var user = req.params['user'];

    db.query(`SELECT * FROM  movies WHERE user = ?`, [user],(error, results) => {
        if(error){
            res.send(error);
            return;
        }
        res.send(results)
    })
});

app.get('/postdatabase', async (req, res) => {
    db.query(`insert into testdb values (3454)`);
})

app.get('/movie/:id', async (req, res)  =>  {
    
    var movie_id = req.params['id'];

    var item = {
        image: '',
        key: movie_id,
        title: '',
        artist: '',
        release: ''
    }

    item = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`)
    .then(data => data.json())
    .then(data => {
        return {
            poster: `https://image.tmdb.org/t/p/w500/${data.poster_path}`,
            title: data.original_title,
            artist: data.production_companies[0].name,
            release: data.release_date.slice(0,4)
        }
    })

    item.artist = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}`)
    .then(resp => resp.json())
    .then(data => {
        return data.crew.filter((member) => member.job == "Director").map((value) =>  value.name)[0]
    });

    item.id = movie_id;

    res.send(item)

})

app.get('/search/movies/:keyword', (req, res) => {
    var items = [];

    var query = req.params['keyword']

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1`)
    .then(data => data.json())
    .then(data => {
        items = data.results.slice(0,5).map((value) => {
            return {
                key: value.id,
                value: `${value.title} (${value.release_date.slice(0,4)})`
            }
        })
        res.send(items);
        }
    )
})

app.listen(3000, () => console.log("Listening on 3000"))
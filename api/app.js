const express = require('express')
const app = express()

const redis = require('redis')
const redisClient = redis.createClient({host:'redis', port: 6379})
const session = require('express-session')
const redisStore = require('connect-redis')(session)


const bodyParser = require('body-parser')
const routes = require('./routes')

redisClient.on('error', (err) => {
    console.log(err);
})

app.use(session({
    secret: 'istolethemfromthepresident',
    name: 'mediatracker',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 604800000},
    store: new redisStore({
        host: 'redis',
        port: 6379,
        client: redisClient,
        ttl: 86400
    })
}))

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({  
  extended: true  
}))



app.use('/api', routes)



app.listen(3000, () => console.log("Listening on 3000"))
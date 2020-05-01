const app = require('express').Router()
const conn = require('../config/mysqlconfig.js');

app.get('/user', async (req, res) => {

    console.log(req.session.user);

    if(req.session.user){
        res.send({status:200, msg:req.session.user})
        return
    }
    res.send({status: 400, msg: "Not Logged in"});
    return
})

app.post('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.send({status: 200, msg: "Logged out"});
    })
})

function generateID(){
    return 8938;
}

app.post('/register', async (req, res) => {
    var body = req.body

    if(body.username && body.password && body.email){
        var user_id = generateID()

        const db = await conn.initDb()

        await db.query(`INSERT INTO users (username, password, email, id) VALUES (
            ?, ?, ?, ?)`, [body.username, body.password, body.email, user_id ])

        await conn.closeDb()

        res.send({status: 200, msg: "Registered user"})
        return 
    }

    res.send({status:200, msg: "Invalid Registration details"});
})

app.post('/login', async (req, res) => {

    console.log("Here");

    var body = req.body

    if(body.username && body.password){

        const db = await conn.initDb();

        var [results, error] = await db.query(`SELECT * FROM users WHERE username=?`, [body.username])
        
        await conn.closeDb(db)

        if(results.length <= 0){
            res.send({status: 400, msg: "No user found"})
            console.log("No User")
            return 
        }
        
        const user = results[0]

        if(user.password == body.password){
            req.session.regenerate(() => {
                req.session.user = user
                console.log(req.session.user);
                res.send({status:200, msg:req.session.user});
            })
            return
        } else {
            res.send({status: 400, msg: "Wrong Username/Password"});
            return;
        }

    }
    res.send({status: 400, msg: "Please enter username and password"})

})

module.exports = app;
const movies = require('./movies.js')
const auth = require('./auth.js')

const router = require('express').Router()

router.use('/movies', movies)
router.use('/auth', auth)

module.exports = router;
const express = require('express')
const router = express.Router()
const db = require('./../db')
// const ensureLoggedIn = require("./../middlewares/ensure_loggedin")

router.get('/', (req,res) => {
    res.render('welcome')
})


module.exports = router
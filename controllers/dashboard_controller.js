const express = require('express')
const router = express.Router()
const db = require('./../db')
const ensureLoggedIn = require("./../middlewares/ensure_loggedin")

router.get('/', (req,res) => {
    res.render('welcome')
})

router.get('/dash', (req,res) => {
    
    const sql = 'SELECT * FROM users;'

    db.query(sql, (err, dbRes) => {

        const users = dbRes.rows

        res.render('usersdashboard', { users, username : req.session.username })

    })
})

module.exports = router
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

router.get('/dash/:id', (req,res) => {

    const userId = req.params.id
    const sql = `SELECT * FROM users WHERE id = $1`

    db.query(sql, [userId], (err,dbRes) => {
        if (err) {
            console.log(err);
            res.redirect("/dash")
        } else {
            const userDetails = dbRes.rows
            res.render('user_profile', {userDetails})
        }
    })
})

module.exports = router
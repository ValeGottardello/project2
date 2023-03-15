const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require('./../db')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/sessions', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const sql = `SELECT * FROM users WHERE username = $1;`
    db.query(sql, [username], (err, dbRes) => {

        if (dbRes.rows.length === 0) {
            res.render('nologin')
            return
        }

        const user = dbRes.rows[0]
        bcrypt.compare(password, user.password_digest, (err, result) => {
            if (result) {
                req.session.userId = user.id
                req.session.username = user.username
                res.redirect('/dash')
            } else {
                console.log(err);
                //maybe event listener with alerto of wrong password
                res.redirect('/login')
            }
        })

    })
})

router.delete('/sessions', (req,res) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
})
//ADD logout botton

module.exports = router
const express = require('express')
const router = express.Router()
const db = require('./../db')
const ensureLoggedIn = require('./../middlewares/ensure_loggedin')
const bcrypt = require('bcrypt')


router.get("/users", (req, res) => {
    res.render('signup')
})

router.post("/users", (req, res) => {

    const username = req.body.username
    const name = req.body.name
    const plainTextPassword = req.body.password
    const country = req.body.country
    const learn_lang = req.body.learn_lang
    const native_lang = req.body.native_lang
    const lang_level = req.body.lang_level
    const imageUrl = req.body.image_url

    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {

            const sql = `INSERT INTO users (username, name, password_digest, image_url, country, learn_lang, native_lang, lang_level) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id;`

            // console.log(sql);
            // res.send("ok")
            db.query(sql, [username, name, digestedPassword, imageUrl, country, learn_lang, native_lang, lang_level], (err, dbRes) => {
                if (err) {
                    console.log(err);
                    res.render('signup')
                } else {
                    req.session.userId = dbRes.rows[0].id
                    // res.send("ok")
                    res.redirect('/dash')
                }
            })
        })
    })
})

router.get("/users/:id", ensureLoggedIn, (req, res) => {
    res.render('setting_account')
})

router.put('/users/:id', ensureLoggedIn, (req, res) => {

    const plainTextPassword = req.body.password
    const oldpassword = req.body.oldpassword

    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {

            const sql = `UPDATE users SET password_digest = $1 WHERE id = $2 RETURNING id;`
         
            db.query(sql, [digestedPassword, req.params.id], (err, dbRes) => {
                if (err) {
                    console.log(err);
                    res.redirect("/")
                } else {
                    req.session.userId = dbRes.rows[0].id
                    res.redirect('/dash') //then change to own profile
                }
            })
        })
    })

})

router.delete("/users/:id", ensureLoggedIn, (req, res) => {
    const sql = `DELETE FROM users WHERE id = $1;`

    db.query(sql, [req.params.id], (err, dbRes) => {
        if (err) {
            console.log(err);
            res.redirect("/")
        } else {
            console.log(dbRes.rows);
            req.session.destroy(() => {
                res.redirect("/")
            })
        }
    })
})

router.get('/users/:id/profile', ensureLoggedIn, (req, res) => {

    const sql = 'SELECT * FROM users WHERE id = $1;'

    db.query(sql, [req.params.id], (err, dbRes) => {

        const myDetails = dbRes.rows

        res.render('myprofile', { myDetails })

    })
})

router.put('/users/:id/profile', ensureLoggedIn, (req, res) => {

    const imageUrl = req.body.image_url
    const aboutMe = req.body.about_me

    const sql = `UPDATE users SET image_url = $1, about_me = $2 WHERE id = $3 RETURNING id;`

    db.query(sql, [imageUrl, aboutMe, req.params.id], (err, dbRes) => {
        if (err) {
            console.log(err);
            res.redirect("/")
        } else {
            req.session.userId = dbRes.rows[0].id
            res.redirect('/dash') 
        }
    })
})

router.get("/search", (req,res) => {
    res.render("search")
})

router.post("/search/user", (req,res) => {
    const learnLang = req.body.learn_lang
    const nativeLang = req.body.native_lang
    const langLevel = req.body.lang_level

    const sql = `SELECT * FROM users WHERE learn_lang = $1 OR native_lang = $2 AND lang_level = $3;`

    db.query(sql, [learnLang, nativeLang, langLevel], (err,dbRes) => {
        if (err) {
            console.log(err);
        }else {
            const users = dbRes.rows
            res.render("searchusers", {users})
        }
    })
})

module.exports = router


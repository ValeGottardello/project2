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
    const plainTextPassword = req.body.password
    const country = req.body.country
    const learn_lang = req.body.learn_lang
    const native_lang = req.body.native_lang
    const lang_level = req.body.lang_level

    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {
            
            const sql = `INSERT INTO users (username, password_digest, country, learn_lang, native_lang, lang_level) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`

            // console.log(sql);
            // res.send("ok")
            db.query(sql, [username, digestedPassword, country, learn_lang, native_lang, lang_level], (err, dbRes) => {
                if (err) {
                    console.log(err);
                    res.render('signup')
                } else {
                    req.session.userId =  dbRes.rows[0].id
                    // res.send("ok")
                    res.redirect('/dash')
                }
            })
        })
    })
})

// router.put('/users/:id', (req, res) => {
//     const plainTextPassword = req.body.newpassword

//     bcrypt.genSalt(10, (err, salt) => {

//         bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {

//             const sql = `UPDATE users SET password_digest = $1 WHERE id = $2 RETURNING id;`

//             // res.send(`${sql}`)
//             db.query(sql, [digestedPassword, req.params.id], (err, dbRes) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     req.session.userId =  dbRes.rows[0].id
//                     res.redirect('/login')
//                 }
//             })
//         })
//     })
// })

// router.delete("/users/:id", (req,res) => {
//     const sql = `DELETE FROM users WHERE id = $1;`
//     // res.send(`${sql}`)
//     db.query(sql, [req.params.id], (err, dbRes) => {
//         if (err) {
//             console.log(err);

//         } else {
//             console.log(dbRes.rows);
//             req.session.destroy(() => {
//                 res.redirect("/")
//             })
//         }
//     })
// })

module.exports = router
const express = require('express')
const router = express.Router()
const db = require('../db')
const ensureLoggedIn = require("../middlewares/ensure_loggedin")

router.get("/post", (req,res) => {

    const sql = `SELECT * FROM posts;`

    db.query(sql, (err, dbRes) => {
        if (err) {
            console.log(err);
            res.redirect('/dash')
        } else {
            const posts = dbRes.rows
            res.render('posts', { posts })
        }
    })
})

router.get("/post/newpost", (req,res) => {
    res.render("newpost")
})

router.post("/post/newpost/:id/:username", (req,res) => {
    const userId = req.params.id
    const imageUrl = req.body.image_url
    const date = new Date().toString()
    const user_name = req.params.username

    const sql = `INSERT INTO posts ( image_url, date, user_name, user_id) VALUES ( $1, $2, $3, $4)`

    db.query(sql, [imageUrl, date, user_name, userId], (err, dbRes) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/post')
        }
    })
})

router.get("/post/:id/singlepost", (req,res) => {
   
    const postId = req.params.id
    const userName = req.query.user_name
    const imageUrl = req.query.image_url

    const sql = `SELECT * FROM comments WHERE post_id = $1;`
    
    db.query(sql, [postId], (err, dbRes) => {
        if (err) {
            console.log(err);
            res.redirect('/post')
        } else {
            const postComments = dbRes.rows
            res.render('single_post', { postComments, userName, imageUrl, postId})
        }
    })
})

router.delete("/post/:id", (req,res) => {
    const postId = req.params.id
    const sql = `DELETE FROM posts WHERE id = $1;`

    
    db.query(sql, [postId], (err,dbRes) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/post')
        }
    })
})


module.exports = router
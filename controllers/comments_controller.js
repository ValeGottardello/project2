const express = require('express')
const router = express.Router()
const db = require('../db')
const ensureLoggedIn = require("../middlewares/ensure_loggedin")

router.post("/comment", ensureLoggedIn, (req,res) => {
    const comment = req.body.comment
    const postId = req.body.post_id
    const userName = req.body.user_name
    const sql = `INSERT INTO comments ( post_id, user_name, comment) VALUES ( $1, $2, $3)`
    

    db.query(sql, [postId, userName, comment], (err, dbRes) =>{
        if (err) {
            console.log(err);
        } else {
            res.redirect(`post/:${postId}/singlepost`)
        }
    })
})

router.delete("/comment/:id", ensureLoggedIn,(req,res) => {
    const commentId = req.params.id
    const sql = `DELETE FROM comments WHERE id = $1;`
    const postId = req.body.post_id

    db.query(sql, [commentId], (err,dbRes) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect(`/post/:${postId}/singlepost`)
        }
    })
})

module.exports = router
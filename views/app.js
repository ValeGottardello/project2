const express = require('express')
const router = express()
const upload = require("./middlewares/upload")

router.get("/", (req,res)=> {
    res.render("form", {lastUpload})
})

let lastUpload = ""

router.post("/", upload.sinlge("uploadFile"), (req,res) => {
    lastUpload = req.file.path

    res.redirect("/")
})

module.exports = router
//require in erver. 
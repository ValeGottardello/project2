const db = require('./../db')
const bcrypt = require('bcrypt')

const username = 'vale@hotmail.com'
const plainTextPassword = 'pudding'

db.connect()

bcrypt.genSalt(10, (err, salt) => {

    bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {
        
        console.log(digestedPassword);
        const sql = `INSERT INTO users (username, password_digest, image_url, country, learn_lang, native_lang, lang_level) VALUES ('${username}', '${digestedPassword}', 'https://images.pexels.com/photos/15871758/pexels-photo-15871758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Argentina', 'English', 'Spanish', 'Intermediate');`

        db.query(sql, (err, dbRes) =>{
            console.log(dbRes);
            db.end()
        })
    })
})
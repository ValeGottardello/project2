const { Client } = require('pg')
const bcrypt = require('bcrypt')
const db = new Client ({
    database: "talkers"
})
const username = 'vale@hotmail.com'
const plainTextPassword = 'mari'

db.connect()

bcrypt.genSalt(10, (err, salt) => {

    bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {
        
        console.log(digestedPassword);
        const sql = `INSERT INTO users (username, name, password_digest, image_url, country, learn_lang, native_lang, lang_level, about_me) VALUES ('${username}', 'Valentina', '${digestedPassword}', 'https://images.pexels.com/photos/15871758/pexels-photo-15871758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Argentina', 'English', 'Spanish', 'Intermediate', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequatur ex accusamus temporibus natus quasi deserunt nisi eum consectetur nostrum, ad magni amet itaque porro est fugiat esse sapiente voluptate.');`

        db.query(sql, (err, dbRes) =>{
            console.log(dbRes);
            db.end()
        })
    })
})


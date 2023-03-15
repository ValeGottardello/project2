CREATE DATABASE talkers;

CREATE TABLE users (
 id SERIAL PRIMARY KEY,
 username TEXT,
 name TEXT,
 password_digest TEXT,
 image_url TEXT,
 country TEXT,
 learn_lang TEXT,
 native_lang TEXT,
 lang_level TEXT ,
 about_me TEXT
);
--add about me
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  comment TEXT,
  image_url TEXT,
  user_id INTEGER
);

--inserted by seed_dummy_user

-- INSERT INTO users (username, name, password_digest, image_url, country, learn_lang, native_lang, lang_level, about_me) VALUES ('${username}', 'Valentina', '${digestedPassword}', 'https://images.pexels.com/photos/15871758/pexels-photo-15871758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Argentina', 'English', 'Spanish', 'Intermediate', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequatur ex accusamus temporibus natus quasi deserunt nisi eum consectetur nostrum, ad magni amet itaque porro est fugiat esse sapiente voluptate.');

-- INSERT INTO posts (comment, image_url, user_id) VALUES ('this is me', 'http:url_image', '27');



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
  image_url TEXT,
  date TEXT, --new date()
  user_name TEXT,
  user_id INTEGER
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER,
  user_name TEXT,
  comment TEXT
);

--inserted by seed_dummy_user

-- INSERT INTO users (username, name, password_digest, image_url, country, learn_lang, native_lang, lang_level, about_me) VALUES ('${username}', 'Valentina', '${digestedPassword}', 'https://images.pexels.com/photos/15871758/pexels-photo-15871758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'Argentina', 'English', 'Spanish', 'Intermediate', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab consequatur ex accusamus temporibus natus quasi deserunt nisi eum consectetur nostrum, ad magni amet itaque porro est fugiat esse sapiente voluptate.');

--ideal
-- INSERT INTO posts ( image_url, date, user_name, user_id) VALUES ( 'http:url_image', 'date', 'valentina', '1');

--INSERT INTO comments ( post_id, user_id, comment) VALUES ( '1', '1', 'wow!that's beautiful');
--clean the comments part



CREATE DATABASE talkers;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  password_digest TEXT,
  image_url TEXT,
  country TEXT,
  learn_lang TEXT,
  native_lang TEXT,
  lang_level TEXT          
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  comment TEXT,
  image_url TEXT,
  user_id INTEGER
);

--ideal
-- INSERT INTO users (username, password_digest, image_url, country, learn_lang, native_lang, lang_level) VALUES ('vale@hotmail.com', 'mariana', 'http:url_image', 'Argentina', 'English', 'Spanish', 'Intermediate');

-- INSERT INTO posts (comment, image_url, user_id) VALUES ('this is me', 'http:url_image', '27');



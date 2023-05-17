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

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  image_url TEXT,
  date TEXT,
  user_name TEXT,
  user_id INTEGER
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER,
  user_name TEXT,
  comment TEXT
);



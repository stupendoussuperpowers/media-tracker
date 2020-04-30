CREATE TABLE movies (
    id VARCHAR(255)  PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist VARCHAR(255),
    release VARCHAR(255),
    poster VARCHAR(1024),
    user VARCHAR(255)
);

INSERT INTO movies (id, title, artist, release, poster, user) VALUES
(`13475`, `Star Trek`, `J.J. Abrams`, `2009`, `https://image.tmdb.org/t/p/w500/hN2ZtF3Uw6mhIHZiqL0SKzELtKn.jpg`, `9420`),
(`188927`, `Star Trek Beyond`, `Justin Lin`, `2016`, `https://image.tmdb.org/t/p/w500/yOnd3XQIg7JBmu0UuBjZyLdsxQD.jpg`, `9420`); 
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose'); 
const Movie = require('../models/Movie.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-express-cinema";

router.get('/', (req, res, next) => res.render('index'));

router.get('/movies', (req, res, next) =>  {
    mongoose.connect(MONGO_URI)
    .then(()=> Movie.find())
    .then(allcinemaMovie =>  {
        console.log('retrieve all movies in DB:', allcinemaMovie)
        res.render('movies', {movies: allcinemaMovie})
    })
    .then(()=> mongoose.connection.close())
    .catch(error => console.log('erro getting information from db'))
})

router.get('/movie/:id', (req, res, next) =>  {
    mongoose.connect(MONGO_URI)
    .then(()=> Movie.findById(req.params.id))
    .then(cinemaMovie =>  {
        console.log('retrieve all movies in DB:', cinemaMovie)
        res.render('movie', {movie: cinemaMovie})
       
    })
    .then(()=> mongoose.connection.close())
    .catch(error => console.log('erro getting information from db'))
})
module.exports = router;


// const movie = require('./routes/movies');
// app.use('/', movie)
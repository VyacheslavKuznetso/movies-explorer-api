const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createMovieValidation, deleteMovieValidation } = require('../validators/movie-validation');
const { getMyMovies, postMyMovie, deleteMyMovie } = require('../controllers/movie');

router.get('/', getMyMovies);
router.post('/', celebrate(createMovieValidation), postMyMovie);
router.delete('/:id', celebrate(deleteMovieValidation), deleteMyMovie);

module.exports = router;

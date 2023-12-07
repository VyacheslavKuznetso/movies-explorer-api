const Movie = require('../models/movie');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.getMyMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(200).send({ movies });
    })
    .catch(next);
};

module.exports.postMyMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      if (!movie) {
        throw new BadRequestError('Некорректный формат данных для создания фильма');
      }
      res.status(201).send(movie);
    })
    .catch(next);
};

module.exports.deleteMyMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((result) => {
      if (!result) {
        throw new NotFoundError('Фильм с указанным id не найден');
      }
      if (!result.owner.equals(req.user._id)) {
        throw new ForbiddenError('Доступ запрещен');
      }
      return Movie.deleteOne(result).then(res.send(result));
    })
    .catch(next);
};

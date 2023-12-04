const router = require('express').Router();
const { celebrate } = require('celebrate');
const { createUser, login } = require('../controllers/user');
const { createUserValidation, loginUserValidation } = require('../validators/user-validation');
const NotFoundError = require('../errors/not-found-err');
const auth = require('../middlewares/auth');

router.post('/signup', celebrate(createUserValidation), createUser); // Валидация приходящих на сервер данных //
router.post('/signin', celebrate(loginUserValidation), login); // Валидация приходящих на сервер данных //

// Авторизация //
router.use(auth);

// Роуты, которым авторизация нужна //
router.use('/movies', require('./movies'));
router.use('/users', require('./users'));

// Обработчик для несуществующих роутов
router.use((req, res, next) => {
  const error = new NotFoundError('Ресурс не найден');
  next(error);
});

module.exports = router;

const router = require('express').Router();
const auth = require('../middlewares/auth');
const ErrorNotFound = require('../errors/ErrorNotFound');
const {celebrate, Joi} = require("celebrate");
const urlRegex = require("../utils/constants");
const {createUser, login} = require("../controllers/users");

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

router.use('/cards', require('./cards'));
router.use('/users', require('./users'));

router.use('*', (req, res, next) => next(new ErrorNotFound('Страница не найдена')));

module.exports = router;
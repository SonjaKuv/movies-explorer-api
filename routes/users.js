const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const {
  getUser, setNewUserInfo,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/users/me', getUser);

router.patch('/users/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), setNewUserInfo);

module.exports = router;

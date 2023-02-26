const router = require('express').Router();
const { userValidation } = require('../middlewares/validation');

const {
  getUser, setNewUserInfo,
} = require('../controllers/users');

router.get('/users/me', getUser);

router.patch('/users/me', userValidation, setNewUserInfo);

module.exports = router;

const router = require('express').Router();
const { celebrate } = require('celebrate');
const { userIdValidation, userMeValidation } = require('../validators/user-validation');
const { getCurrentUser, updateUser } = require('../controllers/user');

router.get('/me', celebrate(userIdValidation), getCurrentUser);
router.patch('/me', celebrate(userMeValidation), updateUser);

module.exports = router;

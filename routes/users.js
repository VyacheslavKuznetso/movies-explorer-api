const router = require('express').Router();
const { celebrate } = require('celebrate');
const { updateUserMeValidation } = require('../validators/user-validation');
const { getCurrentUser, updateUser } = require('../controllers/user');

router.get('/me', getCurrentUser);
router.patch('/me', celebrate(updateUserMeValidation), updateUser);

module.exports = router;

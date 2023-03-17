const { Router } = require('express');
const {
  createUser,
  findUsers,
  findUserbyId,
} = require('../controllers/users.controllers');
const {
  validIfExistUserEmail,
  validIfExistUser,
} = require('../middlewares/user.middlewares');
const { validateFields } = require('../middlewares/validateField.middleware');
const {
  createUserValidator,
} = require('../middlewares/validations.middleware');
const { upload } = require('../utils/multer');

const router = Router();

router.post(
  '/signup',
  upload.single('profileImageUrl'),
  createUserValidator,
  validateFields,
  validIfExistUserEmail,
  createUser
);

router.get('/', findUsers);
router.get('/:id', validIfExistUser, findUserbyId);

module.exports = {
  userRouter: router,
};

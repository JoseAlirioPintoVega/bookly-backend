const { Router } = require('express');
const {
  createbook,
  findbookbyId,
  findbooks,
} = require('../controllers/book.controller');
const { verifyBookById } = require('../middlewares/book.middleware');
const { validateFields } = require('../middlewares/validateField.middleware');
const {
  createBookValidator,
} = require('../middlewares/validations.middleware');
const { upload } = require('../utils/multer');

const router = Router();
router.post(
  '/new',
  upload.array('bookImgs', 3),
  createBookValidator,
  validateFields,
  createbook
);

router.get('/', findbooks);

router.get('/:id', verifyBookById, findbookbyId);

findbooks;

module.exports = {
  bookRouter: router,
};

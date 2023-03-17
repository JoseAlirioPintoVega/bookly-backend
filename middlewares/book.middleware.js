const { async } = require('@firebase/util');
const { Book } = require('../models/book.model');
const { BookImg } = require('../models/bookImg.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.verifyBookById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const book = await Book.findOne({
    where: {
      id,
      status: true,
    },
    include: [{ model: BookImg }],
  });
  if (!book) {
    return next(new AppError('The book was not find', 400));
  }
  req = req.book;
  next();
});

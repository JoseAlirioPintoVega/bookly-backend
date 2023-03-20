const { Book } = require('../models/book.model');
const { BookImg } = require('../models/bookImg.model');
const { Category } = require('../models/category.model');
const catchAsync = require('../utils/catchAsync');

exports.createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const category = await Category.create({ name });

  res.status(200).json({
    status: 'success',
    message: 'The categories was find',
    category,
  });
});

exports.findCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.findAll({
    where: {
      status: true,
    },
    include: [{ model: Book, include: [{ model: BookImg }] }],
  });

  res.status(200).json({
    status: 'success',
    message: 'The categories was find',
    categories,
  });
});

exports.findCategoryById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findOne({
    where: {
      id,
      status: true,
    },
    include: [{ model: Book, include: [{ model: BookImg }] }],
  });
  if (!category) {
    return res.status(400).json({
      status: 'fail',
      message: 'The category was not find',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'The categories was find',
    category,
  });
});

exports.deleteCategories = catchAsync(async (req, res, next) => {});

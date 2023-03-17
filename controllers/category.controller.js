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
  });

  res.status(200).json({
    status: 'success',
    message: 'The categories was find',
    categories,
  });
});

exports.deleteCategories = catchAsync(async (req, res, next) => {});

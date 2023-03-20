const { Book } = require('../models/book.model');
const { Category } = require('../models/category.model');
const catchAsync = require('../utils/catchAsync');

exports.verifyCategoryId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findOne({
    where: {
      id,
      status: true,
    },
    include: [{ model: Book }],
  });
  if (!category) {
    return res.status(400).json({
      status: 'fail',
      message: 'The category was not find',
    });
  }
  console.log(category);
  req.category = req;
  next();
});

const { async } = require('@firebase/util');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validIfExistUserEmail = catchAsync(async (req, res, next) => {
  // recibimos el email y con el buscamos un usuario con ese email si hay enviamos el error si no solo pasamos el user

  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email,
      status: true,
    },
  });
  if (user && !user.status) {
    return next(
      new AppError('The user has acount, but in this moment are disabled ', 400)
    );
  }
  if (user) {
    return next(new AppError('The email user already exists ', 400));
  }
  req.user = user;
  next();
});

exports.validIfExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  req.user = user;
  next();
});

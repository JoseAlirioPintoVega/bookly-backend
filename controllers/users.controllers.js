const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const { Op } = require('sequelize');
const { storage } = require('../utils/firebase');
const { async } = require('@firebase/util');

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role = 'user' } = req.body;

  const imgRef = ref(storage, `users/${Date.now()}-${req.file.originalname}`);
  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const user = new User({
    name,
    email,
    password,
    role,
    profileImageUrl: imgUploaded.metadata.fullPath,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();
  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'The user was create',
    token,
    user: {
      id: user.id,
      name: user.username,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
    },
  });
});

exports.findUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: true,
    },
  });

  const usersPromises = users.map(async user => {
    const imgRef = ref(storage, user.profileImageUrl);
    const url = await getDownloadURL(imgRef);

    user.profileImageUrl = url;

    return user;
  });

  const userResolved = await Promise.all(usersPromises);

  res.status(200).json({
    status: 'success',
    message: 'Users was found successfully',
    users: userResolved,
  });
});

exports.findUserbyId = catchAsync(async (req, res, next) => {
  const { user } = req;

  const imgRef = ref(storage, user.profileImageUrl);
  const url = await getDownloadURL(imgRef);

  user.profileImageUrl = url;

  res.status(200).json({
    status: 'success',
    message: 'User was found successfully',
    user,
  });
});

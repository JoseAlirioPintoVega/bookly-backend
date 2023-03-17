const { async } = require('@firebase/util');
const { uploadBytes, ref, getDownloadURL } = require('firebase/storage');
const { Book } = require('../models/book.model');
const { BookImg } = require('../models/bookImg.model');
const catchAsync = require('../utils/catchAsync');
const { storage } = require('../utils/firebase');

exports.createbook = catchAsync(async (req, res, next) => {
  const {
    title,
    author,
    price,
    rating,
    numberPages,
    publicationDate,
    sinopsis,
    categoryId,
    userId,
  } = req.body;
  const newbook = await Book.create({
    title,
    author,
    price,
    rating,
    numberPages,
    publicationDate,
    sinopsis,
    categoryId,
    userId,
  });

  const bookImgsPromises = req.files.map(async file => {
    const imgRef = ref(storage, `books/$Date.now()-${file.originalname}`);
    const imgUploaded = await uploadBytes(imgRef, file.buffer);

    return await BookImg.create({
      imgUrl: imgUploaded.metadata.fullPath,
      bookId: newbook.id,
    });
  });
  await Promise.all(bookImgsPromises);

  res.status(201).json({
    status: 'success',
    message: 'The product was created successfully',
    newbook,
  });
});

exports.findbooks = catchAsync(async (req, res, next) => {
  const books = await Book.findAll({
    where: {
      status: true,
    },
    include: [{ model: BookImg }],
  });
  console.log(books);
  const productPromise = books.map(async book => {
    const productImgsPromises = book.bookImgs.map(async bookImg => {
      const imgRef = ref(storage, bookImg.imgUrl);
      const url = await getDownloadURL(imgRef);

      bookImg.imgUrl = url;
      return bookImg;
    });
    await Promise.all(productImgsPromises);
  });
  await Promise.all(productPromise);

  res.status(200).json({
    status: 'success',
    message: 'The products found were successfully ',
    books,
  });
});
exports.findbookbyId = catchAsync(async (req, res, next) => {});

const { check } = require('express-validator');

exports.createUserValidator = [
  check('name', 'The username must be mandatory').not().isEmpty(),
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email has been a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
  check(
    'password',
    'The password need min 6 caracters and max 10 caracters'
  ).isLength({
    min: 6,
    max: 16,
  }),
];
exports.createBookValidator = [
  check('title', 'The title must be mandatory').not().isEmpty(),
  check('author', 'The author must be mandatory').not().isEmpty(),
  check('price', 'The price must be mandatory').not().isEmpty(),
  check('rating', 'The rating must be mandatory').not().isEmpty(),
  check('numberPages', 'The numberPages must be mandatory').not().isEmpty(),
  check('publicationDate', 'The publicationDate must be mandatory')
    .not()
    .isEmpty(),
  check('sinopsis', 'The sinopsis must be mandatory').not().isEmpty(),
  check('categoryId', 'The categoryId must be mandatory').not().isEmpty(),
  check('userId', 'The userId must be mandatory').not().isEmpty(),
  /* check('password', 'The password must be mandatory').not().isEmpty(),
  check(
    'password',
    'The password need min 6 caracters and max 10 caracters'
  ).isLength({
    min: 6,
    max: 16,
  }), */
];

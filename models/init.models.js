const { Book } = require('./book.model');
const { BookImg } = require('./bookImg.model');
const { Cart } = require('./cart.model');
const { Category } = require('./category.model');
const { BookInCart } = require('./bookInCart.model');
const User = require('./user.model');

const initModel = () => {
  // relations
  // User.hasMany(Product, { Source: 'id', foreignKey: 'userId' });
  // Product.belongsTo(User, { source: 'id', foreignKey: 'userId' });

  User.hasMany(Book);
  Book.belongsTo(User);

  Book.hasMany(BookImg);
  BookImg.belongsTo(Book);

  Category.hasMany(Book);
  Book.belongsTo(Category);

  Cart.hasMany(BookInCart);
  BookInCart.belongsTo(Cart);

  Book.hasOne(BookInCart);
  BookInCart.belongsTo(Book);
};

module.exports = initModel;

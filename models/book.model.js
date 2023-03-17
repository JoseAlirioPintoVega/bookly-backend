const { db } = require('../database/db');
const { DataTypes } = require('sequelize');

//titulo, autor, precio, rating, género=category, editorial, cant de páginas. fecha de publicación. sinopsis y fotos (3)

exports.Book = db.define('book', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  numberPages: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  publicationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  sinopsis: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  /*   stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookPDFUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  }, */
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

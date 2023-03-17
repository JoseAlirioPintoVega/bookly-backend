const { Router } = require('express');
const {
  createCategory,
  findCategories,
  deleteCategories,
} = require('../controllers/category.controller');

const router = Router();

router.post('/', createCategory);

router.get('/', findCategories);

router.get('/', deleteCategories);

module.exports = {
  categoryRouter: router,
};

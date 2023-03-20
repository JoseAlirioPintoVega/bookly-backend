const { Router } = require('express');
const {
  createCategory,
  findCategories,
  deleteCategories,
  findCategoryById,
} = require('../controllers/category.controller');

const router = Router();

router.post('/', createCategory);

router.get('/', findCategories);

router.get('/:id', findCategoryById);

router.get('/', deleteCategories);

module.exports = {
  categoryRouter: router,
};

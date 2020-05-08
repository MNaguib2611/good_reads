const router = require('express').Router();
const categoryController = require('../controllers/category')
const bookController = require('../controllers/book')

router.get('/', categoryController.getAllCategories)

router.get('/:category', bookController.categoryBooks)

router.post('/add', categoryController.createCategory)

router.patch('/edit/:id', categoryController.editCategory)

router.delete('/:id', categoryController.deleteCategory)

module.exports = router;
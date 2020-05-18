const router = require('express').Router();
const categoryController = require('../controllers/category')
// const bookController = require('../controllers/book')



router.get('/', categoryController.getAllCategories)

// router.get('/:category', categoryController.categoryBooks)

router.post('/add', categoryController.createCategory)

router.patch('/edit/:id', categoryController.editCategory)

router.delete('/:id', categoryController.deleteCategory)

/*
* GET /categories/search?q=ahmed
* Return array of categories objects with status code -> 200
* Or status code -> 404 For Error or no categories found
* */
router.route('/search').get(categoryController.search);

module.exports = router;
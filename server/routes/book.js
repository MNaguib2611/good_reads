const express = require('express');
const router = express.Router();
const multer  = require('multer');

// Destructure bookController
const { bookController } = require('../controllers/allControllers');

/*
* GET /books/search?q=ahmed
* Return array of books objects with status code -> 200
* Or status code -> 404 For Error or no authors found
* */
router.route('/search').get(bookController.search);

// Set upload files destination
const upload = multer({ dest: 'public/uploads/' });

// Retrieve all created books
router.get('/', (req, res) => {
    bookController.all(req, res);
});

// Create new book
router.post('/', upload.single('image'), (req, res) => {
    bookController.create(req, res);
});

// Update created book
router.put('/:bookId', upload.single('image'), (req, res) => {
    bookController.update(req, res);
});

// Delete selected book
router.delete('/:bookId', (req, res) => {
    bookController.remove(req, res);
});

// Rate selected book
router.post('/:bookId/rate', (req, res) => {
    bookController.rate(req, res);
});

module.exports = router;
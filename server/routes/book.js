const express = require('express');
const router = express.Router();
const multer  = require('multer');

// Destructure bookController
const { bookController } = require('../controllers/allControllers');


const storage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
},
filename: (req, file, cb) => {
    cb(null, file.originalname);
}
});

// Set filters to image upload
const fileFilter = (req, file, cb) => {
if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    cb(null,true)
} else {
    cb(new Error('only allowed types are jpeg, png, jpg'), false)
}
}

// Apply multer option to image upload
const upload = multer({
storage,
fileFilter
});





/*
* GET /books/search?q=ahmed
* Return array of books objects with status code -> 200
* Or status code -> 404 For Error or no books found
* */
router.route('/search').get(bookController.search);

// // Set upload files destination
// const upload = multer({ dest: 'public/uploads/' });

// Retrieve all created books
router.get('/', bookController.all);

// Create new book
router.post('/', upload.single('image'), bookController.create);

// Update created book
router.put('/:bookId', upload.single('image'), bookController.update);

// Delete selected book
router.delete('/:bookId', bookController.remove);

// Retrieve one book
router.get('/:bookId', bookController.book);

// Rate selected book
router.post('/:bookId/rate', bookController.rate);

// Retrieve popular books
router.get('/popular/all', bookController.popular);

module.exports = router;
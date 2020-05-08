const express = require('express');
const router = express.Router();
const multer  = require('multer');

const { bookController } = require('../controllers/allControllers');

// Set upload files destination
const upload = multer({ dest: 'public/uploads/' });

router.get('/', (req, res) => {
    // Retrieve all created books
    bookController.all(req, res);
});

router.post('/', upload.single('image'), (req, res) => {
    // Create new book
    bookController.create(req, res);
});

module.exports = router;
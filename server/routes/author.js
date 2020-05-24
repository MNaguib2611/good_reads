const router = require('express').Router();
const multer = require('multer');
let authorController = require('../controllers/author')
let bookController = require('../controllers/book')


// Set upload files destination and file name
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
* GET /authors/search?q=ahmed
* Return array of authors objects with status code -> 200
* Or status code -> 404 For Error or no authors found
* */
router.route('/search').get(authorController.search);

//get all authors
router.get('/',authorController.getAllAuthors);

//add new author
router.post('/add',upload.single('image'), authorController.addAuthor);

//get author by id
router.get('/:id',authorController.getAuthorById)

//delete author
router.delete('/:id',authorController.deleteAuthor)

//update author
router.put('/edit/:id',upload.single('image'), authorController.updateAuthor)

//get author books
router.get('/books/:author', bookController.getAuthorBooks)

router.get('/popular/all', authorController.popularAuthor);

module.exports = router;

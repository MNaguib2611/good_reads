const router = require('express').Router();
const multer = require('multer');
let authorController = require('../controllers/author')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null,true)
    } else {
        cb(new Error('only allowed types are jpeg, png, jpg'), false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// router.route('').get(authorController.search)

//get all authors
router.route('/').get(authorController.getAllAuthors);

//add new author
router.route('/add').post(upload.single('photo'), authorController.addAuthor);

//get author by id
router.route('/:id').get(authorController.getAuthorById)

//delete author
router.route('/:id').delete(authorController.deleteAuthor)

//update author
router.route('/edit/:id').put(authorController.editAuthor)


module.exports = router;

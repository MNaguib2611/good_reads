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

/*
* GET /authors/search?q=ahmed
* Return array of authors objects with status code -> 200
* Or status code -> 404 For Error or no authors found
* */
router.route('/search').get(authorController.search);

//get all authors
router.get('/',authorController.getAllAuthors);

//add new author
router.post('/add',upload.single('photo'), authorController.addAuthor);

//get author by id
router.get('/:id',authorController.getAuthorById)

//delete author
router.delete('/:id',authorController.deleteAuthor)

//update author
router.put('/edit/:id',authorController.editAuthor)


module.exports = router;

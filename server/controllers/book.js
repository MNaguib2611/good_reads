const fs = require('fs');
const Book = require('../models/book');

const categoryBooks = (req, res)=>{
    Book.find({category: req.params.category})
        .select('name author image')
        .then(categories=> {
            res.status(200).json(categories)
        })
        .catch(err => res.status(400).json('Error: ' + err))
}

// Retrieve all books
const all = (req, res) => {
    Book.find({}).then((books) => {
        res.status(200).json({"data": books});
    }).catch((err) => {
        res.status(400).json({"error": err});
    });
};

// Create new book
const create = (req, res) => {
    const book = new Book({
        ...req.body,
        // image: req.file.path || null
    });

    book.save().then(() => {
        res.status(200).json({"data": book});
    }).catch((err) => {
        res.status(400).json({"error": err});
    });
};

// Update existing book
const update = (req, res) => {
    const bookId = req.params.bookId;

    Book.findOneAndUpdate({_id: bookId}, {
        ...req.body,
        image: req.file.path
    }).then((book) => {
        // if a new image is added remove old one
        if(req.file){
            fs.unlinkSync(book.image);
        }
        res.status(200).json({"data": book});
    }).catch((err) => {
        res.status(400).json({"error": err});
    })
};

// Delete book
const remove = (req, res) => {
    const bookId = req.params.bookId;

    Book.findByIdAndDelete(bookId).then((book) => {
        res.status(200).json({"data": book});
    }).catch((err) => {
        res.status(400).json({"error": err});
    })
};




module.exports = {
    categoryBooks,
    all,
    create,
    update,
    remove
}
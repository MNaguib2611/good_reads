const Book = require('../models/book')

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
        res.json(books);
    });
};

// Create new book
const create = (req, res) => {
    const book = new Book({
        ...req.body
    });

    book.save().then(() => {
        res.json(book);
    }).catch((err) => {
        res.status(400).json(err);
    });
}

module.exports = {
    categoryBooks,
    all,
    create
}
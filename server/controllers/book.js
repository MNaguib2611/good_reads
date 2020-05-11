const fs = require('fs');
const Book = require('../models/book');

const search = async (req, res) => {
    const q = req.query.q || ""
    try {
        const books = await Book.find({name: {$regex: q,$options: "i"}})
        if(books.length === 0)
        {
            return res.status(404).end()
        }
        res.status(200).send(books)

    } catch (e) {
        res.status(404).end()
    }
}

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
        res.status(500).json({"error": err});
    });
};

// Create new book
const create = (req, res) => {
    const book = new Book({
        ...req.body,
        image: req.file && req.file.path
    });

    book.save().then((book) => {
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
        // if a new image is added remove old one
        if(req.file){
            fs.unlinkSync(book.image);
        }
        res.status(200).json({"data": book});
    }).catch((err) => {
        res.status(500).json({"error": err});
    })
};

// Rate book
const rate = (req, res) => {
    const bookId = req.params.bookId;
    const { user, body: { rating } } = req;

    // create rating object to save
    const rate = {
        rating: rating,
        user: user._id
    };

    Book.findById(bookId).then((book) => {
        const rateIndex = book.rate.findIndex(rate => rate.user.toString() === user._id.toString());
        
        // Check if the user has already a rate to alter if not push a new rate object
        rateIndex === -1 ? book.rate.push(rate) : book.rate[rateIndex].rating = rating;
        // calculate avrage rate
        const sum = book.rate.reduce((sum,rate)=>{
            return sum+rate.rating;
        },0)
        book.avgRate=sum/book.rate.length
        // Apply changes
        book.save().then((book) => {
            // Return last saved document if new rate is added and rate via index if updated
            res.status(200).json({"data": rateIndex === -1 ? book.rate[book.rate.length - 1] : book.rate[rateIndex]});
        }).catch((err) => {
            res.status(500).json({"error": err});
        });
    }).catch((err) => {
        res.status(400).json({"error": err});
    })
}

module.exports = {
    categoryBooks,
    all,
    create,
    update,
    remove,
    rate,
    search
}
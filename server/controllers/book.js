const fs = require('fs');
const Book = require('../models/Book');
const { UserModel } = require('../models/allModels');

const search = async (req, res) => {
    const q = req.query.q || ""
    try {
        const books = await Book.find({
            name: {
                $regex: q, $options: "i"
            }
        });
        if(books.length === 0)
        {
            return res.status(404).end();
        }
        res.status(200).send(books);

    } catch (e) {
        res.status(404).end();
    }
}

// const categoryBooks = (req, res)=>{
//     Book.find({category: req.params.category})
//         .select('name author image')
//         .then(categories=> {
//             res.status(200).json(categories)
//         })
//         .catch(err => res.status(400).json('Error: ' + err))
// }

//get author's books
const getAuthorBooks = (req, res)=>{
    Book.find({author: req.params.author})
        .select('name author image')
        .then(books=> {
            res.status(200).json({"data": books})
        })
        .catch(err => res.status(400).json({'error: ': err}))
}

// Retrieve all books
const all = (req, res) => {
    Book.find({}).populate('author').populate('category').then((books) => {
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

    Book.findByIdAndUpdate(bookId, {
        ...req.body,
        image: req.file && req.file.path
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

// Get User book shelve option
const option = async (bookId, userId) => {
    const user = await UserModel.findById(userId);
    // Find book in user's books using current book id
    return user.books.find((book) => book.book.toString() === bookId.toString());
};

// Get each book
const book = (req, res) => {
    const bookId = req.params.bookId;

    // Find book by id and populate author and category data
    Book.findById(bookId).populate('author').populate('category').then((book) => {
        if(req.user){
            // Get user book status options and rating
            option(book._id, req.user._id).then(option => {
                // Find user rating on current book
                const rating = book.rate.find(rate => rate.user.toString() === req.user._id.toString());
                // Check if the book is selected by user
                res.status(200).json({"data": {book, status: option? option.status : "not selected", userRate: rating ? rating.rating : 0}});
            });
        }else{
            // Return book data with no user activity
            res.status(200).json({"data": book});
        }
    }).catch((err) => {
        res.status(500).json({"error": err});
    });
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
        // calculate average rate
        const sum = book.rate.reduce((sum,rate) => {
            return sum+rate.rating
        },0);
        book.avgRate=sum/book.rate.length;
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

const popular = (req, res) => {
    // Retrieve books sorted by popularity and limited to 9
    Book.find({}, null, {sort: {popularity: -1}, limit: 9}).populate('author').populate('category').then((books) => {
        res.status(200).json({"data": books});
    }).catch((err) => {
        res.status(500).json({"error": err});
    });
};

module.exports = {
    getAuthorBooks,
    all,
    create,
    update,
    remove,
    rate,
    search,

    popular,
    book
}


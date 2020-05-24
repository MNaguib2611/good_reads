const fs = require('fs');
const Book = require('../models/Book');
const { UserBooksModel } = require('../models/allModels');

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
    const perPage = req.query.page ? 8 : null; // Books per page
    const page = perPage ? parseInt(req.query.page) : 0; // Check if there is a query string for page number

    // Skip data till last fetched document and limit to perpage variable, Limit will be null if no query parameter for page found
    Book.find({}, null, { skip: perPage * (page-1), limit: perPage }).populate('author').populate('category').then((books) => {
        // Get all book documents count
        Book.countDocuments().exec((err, count) => {
            if (err) res.status(500).end();

            const data = perPage ? {
                // return book data with current page number and all pages available
                books,
                page,
                pages: parseInt(count/perPage)+1 // Count number of available pages
            } : books;

            res.status(200).json(data);
        });
    }).catch(() => {
        res.status(500).end();
    });
};

// Create new book
const create = (req, res) => {
    const path = req.file.path.substring(6);
    const book = new Book({
        ...req.body,
        image: req.file && path
    });

    book.save().then((book) => {
        res.status(200).json(book);
    }).catch(() => {
        res.status(500).end();
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
        res.status(200).json(book);
    }).catch(() => {
        res.status(400).end();
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
        res.status(200).json(book);
    }).catch(() => {
        res.status(500).end();
    })
};

// Get each book
const book = (req, res) => {
    const bookId = req.params.bookId;

    // Find book by id and populate author and category data
    Book.findById(bookId).populate('author').populate('category').then((book) => {
        if(req.user){
            // Get user book status options and rating
            // Find user rating on current book
            const rating = book.rate.find(rate => rate.user.toString() === req.user._id.toString());

            // Find book status in user's books using current book id and user id
            UserBooksModel.findOne({book: book._id, user: req.user._id}).then(userBook => {
                // Check if the book is selected by user
                res.status(200).json({book, status: userBook? userBook.status : "not selected", userRate: rating ? rating.rating : 0});
            });
        }else{
            // Return book data with no user activity
            res.status(200).json(book);
        }
    }).catch(() => {
        res.status(500).end();
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
            res.status(200).json(rateIndex === -1 ? book.rate[book.rate.length - 1] : book.rate[rateIndex]);
        }).catch(() => {
            res.status(500).end();
        });
    }).catch(() => {
        res.status(400).end();
    })
}

const popular = (req, res) => {
    // Retrieve books sorted by popularity and limited to 9
    Book.find({}, null, {sort: {popularity: -1}, limit: 9}).populate('author').populate('category').then((books) => {
        res.status(200).json(books);
    }).catch(() => {
        res.status(500).end();
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


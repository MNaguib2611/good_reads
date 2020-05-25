const {UserModel, BookModel, UserBooksModel, AuthorModel, CategoryModel} = require('../models/allModels');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const getAllUsers = function (req, res) {
    UserModel.find({"isAdmin": false}, function (err, users) {
        res.json(users);
    });
}
const getOneUser = function (req, res) {
    UserModel.find({
        "isAdmin": false,
        '_id': req.params.id
    }).exec((err, user) => {
        res.json(user);
    });

}
const updateProfile = async function (req, res) {
    //check if users is only updating themselves
    if (req.params.id != req.user._id) {
        res.status(403).json({"message": "action not permitted"})
    }
    const {
        body: {
            firstName,
            lastName,
            image,
        }
    } = req;
    const user = await UserModel.findById(req.user.id)
    user.firstName = firstName;
    user.lastName = lastName;
    user.image = image;

    user.save((err) => {
        if (err) {
            console.log(err);
            res.status(424).json({"message": err.message});
        } else {
            res.status(200).json({"message": "Account has been updated successfully"});
        }

    })
}

const passwordUpdate = async function (req, res) {
    const {
        body: {
            password,
            newPassword
        }
    } = req;

    const user = await UserModel.findById(req.user.id)
    if (await bcrypt.compare(password, user.password)) {
        user.password = newPassword;
        user.save((err) => {
            if (err) {
                res.status(424).json({"message": err.message});
            } else {
                res.status(200).json({"message": "Password has been updated successfully"});
            }
        })
    } else {
        res.status(424).json({"message": "wrong password"});
    }
}


const manageShelves = async (req, res) => {
    const bookId = req.params["id"];
    const userId = req.params["user_id"];
    const {body: {status}} = req;

    try {
        const book = await UserBooksModel.findOneAndUpdate({
            book: mongoose.Types.ObjectId(bookId),
            user: mongoose.Types.ObjectId(userId)
        }, {status}, {
            new: true,
            upsert: true // Make this update into an upsert
        }).populate({
            path: 'book',
            select: ['avgRate', 'image', 'description', 'name', 'rate'],
            populate: {
                path: 'author',
                model: 'Author',
                select: ['name']
            },

        }).lean();

        const rate = book.book.rate.reduce((acc, rate) => {
            if (rate.user.toString() === userId) {
                return acc + rate.rating
            }
            return acc
        }, 0)
        book.book.userRate = rate

        return res.send(book)
    } catch (e) {
        console.log(e)
        return res.status(500).end()
    }
}

const getUserBooks = async (req, res) => {
    const userId = req.params["user_id"];
    const statusOptions = ["read", "reading", "want to read"];
    const status = (req.query.status && [statusOptions[req.query.status - 1]]) || statusOptions
    const pages = {
        hasPrevious: false
    }
    const result = {}
    if (req.query.page && req.query.page > 1) {
        pages.hasPrevious = true
    }
    const page = (req.query.page && req.query.page - 1) || 0
    const limit = 10;
    try {

        const booksNumbers = await UserBooksModel.find({
            user: mongoose.Types.ObjectId(userId),
            status: {$in: status}
        }).countDocuments();
        pages.hasNext = booksNumbers > (page + 1) * limit;
        let books = await UserBooksModel.find({
            user: mongoose.Types.ObjectId(userId),
            status: {$in: status}
        }).limit(limit).skip(limit * page).populate({
            path: 'book',
            select: ['avgRate', 'image', 'description', 'name', 'rate'],
            populate: {
                path: 'author',
                model: 'Author',
                select: ['name']
            },

        }).lean();
        for (let i = 0; i < books.length; ++i) {
            const book = books[i];
            const rate = book.book.rate.reduce((acc, rate) => {
                if (rate.user.toString() === userId) {
                    return acc + rate.rating
                }
                return acc
            }, 0)
            book.book.userRate = rate
        }
        return res.send({books, pages})
    } catch (e) {
        console.log(e)
        return res.status(500).end()
    }
}

const search = async (req, res) => {
    const q = req.query.q || ""
    try {
        const books = await BookModel.find({name: {$regex: q, $options: "i"}}).lean();
        const categories = await CategoryModel.find({name: {$regex: q,$options: "i"}}).lean();
        const authors = await AuthorModel.find({name: {$regex: q, $options: "i"}}).lean();
        books.forEach((book) => { book.type = "Book" })
        categories.forEach((category) => { category.type = "Category" })
        authors.forEach((author) => { author.type = "Author" })
        const result = books.concat(categories).concat(authors)
        result.sort(function(a, b) {
            var keyA = a.name,
                keyB = b.name;
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        if(result.length === 0)
        {
            return res.status(404).end();
        }
        res.status(200).send(result);

    } catch (e) {
        console.log(e)
        res.status(404).end();
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    updateProfile,
    passwordUpdate,
    manageShelves,
    getUserBooks,
    search
}
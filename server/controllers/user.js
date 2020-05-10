const {UserModel} = require('../models/allModels');
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
    UserModel.findByIdAndUpdate(
        {_id: req.user._id},
        {
            firstName,
            lastName,
            image,
        },
        function (err, result) {

            if (err) {
                console.log(err);
                res.status(424).json({"message": "something went wrong"});
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

    if (await bcrypt.compare(password, req.user.password)) {
        console.log("asdsadsad");

        UserModel.findByIdAndUpdate(
            {_id: req.user._id},
            {
                "password": await bcrypt.hash(newPassword, 8)
            },
            function (err, result) {

                if (err) {
                    console.log(err);
                    res.status(424).json({"message": "something went wrong"});
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
    console.log(bookId, status, userId);
    try {
        const user = await UserModel.findById(userId)
        let bookIsExist = false
        user.books = user.books.map((book) => {
            if (book.book.toString() === bookId) {
                book.status = status
                bookIsExist = true
            }
            return book
        })

        if (!bookIsExist) {
            user.books = user.books.concat({book: mongoose.Types.ObjectId(bookId), status})
        }
        await user.save()
        return res.send({"message": "your Shelves updated successfully"})
    } catch (e) {
        // console.log(e)
        return res.status(500).end()
    }
}

const getUserBooks = async (req, res) => {
    const userId = req.params["user_id"];
    const statusOptions = ['read', "reading", "want to read"];
    const status = (req.query.status && [statusOptions[req.query.status - 1]]) || statusOptions
    const pages = {
        hasPrevious: null
    }
    if (req.query.page && req.query.page > 1) {
        pages.hasPrevious = true
    }
    const page = (req.query.page && req.query.page - 1) || 0
    const limit = 2;
    const user = await UserModel.aggregate([{$match: {_id: mongoose.Types.ObjectId(userId)}}, {$unwind: '$books',}, {$match: {'books.status': {$in: status}}}, {
        $lookup: {
            from: "books",
            localField: "books.book",
            foreignField: "_id",
            as: "books.book"
        }
    }, {$unwind: '$books.book'}, {$addFields: {'books.authors': []}}, {
        $lookup: {
            from: "authors",
            localField: "books.book.author",
            foreignField: "_id",
            as: "books.authors"
        }
    }, {$unwind: '$books.authors'}, {
        $group: {
            _id: '$_id',
            books: {$push: '$books'}
        },

    }, {$addFields: {'pages': {...pages}}}, {
        $project: {
            pages: {
                ...pages,
                "numberOfBooks": {$cond: {if: {$isArray: "$books"}, then: {$size: "$books"}, else: "NA"}},
                "hasNext": {$gt: [{$size: "$books"}, (page + 1) * limit]}
            },
            books: 1,
            books: {$slice: ["$books", page * limit, limit]}
        },
    }]).exec()
    return res.send(user[0])
}


module.exports = {
    getAllUsers,
    getOneUser,
    updateProfile,
    passwordUpdate,
    manageShelves,
    getUserBooks
}
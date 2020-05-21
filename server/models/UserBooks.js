const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userBooksSchema = new Schema({
        status: {
            type: String, enum: {
                values: ["read", "reading", "want to read"],
                message: 'Status is required.'
            }, required: true
        },
        book: {type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    },
    {
        timestamps: true
    });

const UserBooks = mongoose.model('UserBooks', userBooksSchema);

module.exports = UserBooks;
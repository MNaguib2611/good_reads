const mongoose = require('mongoose');
const fs = require('fs');
const Schema = mongoose.Schema;

const AuthorSchema = Schema({
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        bio: {
            type: String,
            minlength: 10
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        photo: {
            type: String,
            // data: Buffer
        },
        books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Book'
            }
        ],
    },
    {
        timestamps: true,
    })

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;
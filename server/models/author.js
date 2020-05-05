const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = Schema({
        firstname: {
            type: String,
            // required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        lastname: {
            type: String,
            // required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        dateofbirth: {
            type: Date,
            required: true
        },
        photo: {
            type: String
        },
        // books: [
        //     {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'Book'
        //     }
        // ],
    },
    {
        timestamps: true,
    })

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;
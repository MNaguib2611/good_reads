const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = Schema({
        name: {
            type: String,
            required: [true, 'Your name cannot be blank.'],
            unique: [true, 'name already exist'],
            trim: true,
        },
        bio: {
            type: String,
            default: null,
            trim: true
        },
        popularity: {
            type: Number,
            default: 0
        },
        dateOfBirth: {
            type: Date,
        },
        image: {
            type: String,
            default: null
        },
    },
    {
        timestamps: true,
    })

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;
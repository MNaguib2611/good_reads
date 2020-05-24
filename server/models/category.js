"use strict";

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true,"name is required"]
    },
    popularity: {
        type: Number,
        default: 0
    },
 },{
     timestamps: true
 })

categorySchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'category'
})

 const Category = mongoose.model('Category', categorySchema)

 module.exports = Category
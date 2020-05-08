"use strict";

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true,"name is required"]
    },
 },{
     timestamps: true
 })

 const Category = mongoose.model('Category', categorySchema)

 module.exports = Category
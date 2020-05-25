const Category = require('../models/category');
const Book = require('./book');

const search = async (req, res) => {
    const q = req.query.q || ""
    try {
        const categories = await Category.find({name: {$regex: q,$options: "i"}})
        if(categories.length === 0)
        {
            return res.status(404).end()
        }
        res.status(200).send(categories)

    } catch (e) {
        res.status(404).end()
    }
}


// get all category
const getAllCategories = (req, res)=>{
    console.log("req list from client");
    
    Category.find()
            .select('name')
            .then(categories=> {
                res.json(categories)
            })
            .catch(err => res.status(500).json('Error: ' + err))
}


// create new category
const createCategory = (req, res)=>{
    console.log("req create from client");
    const name = req.body.name
    const newCategory = new Category({name})
    newCategory.save()
        .then(() => res.status(201).send('Category has been created!'))
        .catch(err => {
            res.status(500).json('Error: ' + err)
        })
}


// edit category
const editCategory = (req, res)=>{
    console.log("req edit from client");
    Category.findById(req.params.id)
        .then(category=>{
            category.name = req.body.name
            category.save()
                    .then(()=>res.status(201).json('Category has been updated!'))
                    .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(500).json('Error: ' + err))
}

const deleteCategory = (req, res)=>{
    Category.findByIdAndDelete(req.params.id)
        .then(()=>res.status(200).json('Category has been deleted!'))
        .catch(err => res.status(500).json('Error: ' + err))
}


// get books of category
const categoryBooks = async (req, res)=>{
    console.log("req list books from client");
    console.log(req);
    try {
        const category = await Category.findById(req.params.category);
        console.log(category);
        console.log("after category");
        await category.populate({
            path: 'books',
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate();
        console.log(category.books);
        if (!category.books) {
            res.status(404).send('not found')
        }
        res.status(200).json(category.books)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get popular category
const popularCategories = async (req, res) =>{
    // try {
    //     const books = await Book.popular(req, res)
    //     if (!books) {
    //         res.status(404).send('not found')
    //     }
    //     res.status(200).json(category.books)
    // } catch (error) {
    //     res.status(500).json(error);
    // }
}
const popular = (req, res) => {
    // Retrieve books sorted by popularity and limited to 9
    Category.find({}, null, {sort: {popularity: -1}, limit: 5}).then((categories) => {
        res.status(200).json(categories);
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    });
};

module.exports = {
    getAllCategories,
    createCategory,
    editCategory,
    deleteCategory,
    categoryBooks,
    search,
    popularCategories,
    popular
}
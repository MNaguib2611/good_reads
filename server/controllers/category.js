const Category = require('../models/category')

const getAllCategories = (req, res)=>{
    Category.find()
            .select('name')
            .then(categories=> {
                res.json(categories)
            })
            .catch(err => res.status(500).json('Error: ' + err))
}

const createCategory = (req, res)=>{
    const name = req.body.name
    const newCategory = new Category({name})
    newCategory.save()
        .then(() => res.status(201).send('Category has been created!'))
        .catch(err => {
            res.status(400).json('Error: ' + err)
        })
}

const editCategory = (req, res)=>{
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

const categoryBooks = async (req, res)=>{
    try {
        const category = await Category.findById(req.params.category);
        await category.populate('books').execPopulate();
        // console.log(category.books);
        if (!books) {
            res.status(404).send('not found')
        }
        res.status(200).json(category.books)
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    getAllCategories,
    createCategory,
    editCategory,
    deleteCategory,
    categoryBooks,
}
const Category = require('../models/category')

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
        // console.log(category);
        await category.populate('books').execPopulate();
        // console.log(category.books);
        if (!category.books) {
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
    search
}
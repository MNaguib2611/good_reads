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
                res.status(200).json(categories)
            })
            .catch(err => res.status(400).json('Error: ' + err))
}

const createCategory = (req, res)=>{
    const name = req.body.name
    const newCategory = new Category({name})
    newCategory.save()
        .then(() => res.status(201).json('Category has been created!'))
        .catch(err => {
            res.status(400).json('Error: ' + err)
        })
}

const editCategory = (req, res)=>{
    Category.findById(req.params.id)
        .then(category=>{
            category.name = req.body.name
            category.save()
                    .then(()=>res.status(200).json('Category has been updated!'))
                    .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
}

const deleteCategory = (req, res)=>{
    Category.findByIdAndDelete(req.params.id)
        .then(()=>res.status(200).json('Category has been deleted!'))
        .catch(err => res.status(400).json('Error: ' + err))
}


module.exports = {
    getAllCategories,
    createCategory,
    editCategory,
    deleteCategory,
    search
}
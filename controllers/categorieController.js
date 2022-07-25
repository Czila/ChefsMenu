const categorieSchema = require('../db/models/Categorie')



const categorieController = {

    getCategories: (req,res) => {
        categorieSchema.find({}).then((categories)=>res.send(categories))
    },
    
    getCategorie: (req,res) => {
        const _id = req.params.id
        categorieSchema.find({_id}).then((categorie)=>res.send(categorie))
    },
    
    createCategorie: async (req, res) => {
     const nom = req.body.nom
    try {
     const categorie = new categorieSchema({
        nom,
        idRestaurateur
     })
    
     await categorie.save()
     res.send(categorie)
    }
    catch(err)
    {
        res.send(err.message)
    }
    },
    
    updateCategorie: async (req,res) => {
        const _id = req.params.id
        const nom = req.body.nom
    
    try {
        const categorieUpdate = await categorieSchema.findByIdAndUpdate(_id, {
            nom,
            idRestaurateur
        })
    
        res.send(categorieUpdate)
    }
    
        catch(err)
    {
        res.send(err.message)
    }
    },
    
    
    deleteCategorie: async (req,res) => {
        const _id = req.params.id
    
    try {
        const categorieDelete = await categorieSchema.deleteOne({_id: _id})
    
        res.send(categorieDelete)
    }
    
        catch(err)
    {
        res.send(err.message)
    }
    }
    }
    module.exports = categorieController;
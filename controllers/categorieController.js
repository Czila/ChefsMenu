
const categorieController = {

    getCategories: (req,res) => {
        categorieSchema.find({}).then((categories)=>res.send(categories))
    },
    
    getCategorie: (req,res) => {
        const _id = req.params.id
        categorieSchema.find({_id}).then((categorie)=>res.send(categorie))
    },
    
    createCategorie: async (req, res) => {
     const {nom} = res.body
    try {
     const categorie = new categorieSchema({
        nom
     })
    
     await categorie.save()
     return(categorie)
    }
    catch(err)
    {
        return(err.message)
    }
    },
    
    updateCategorie: async (req,res) => {
        const _id = req.params.id
        const {nom} = res.body
    
    try {
        const categorieUpdate = await categorieSchema.findByIdAndUpdate(_id, {
            nom
        })
    
        return categorieUpdate
    }
    
        catch(err)
    {
        return(err.message)
    }
    },
    
    
    deleteCategorie: async (req,res) => {
        const _id = req.params.id
    
    try {
        const categorieDelete = await categorieSchema.deleteOne({_id: id})
    
        return categorieDelete
    }
    
        catch(err)
    {
        return(err.message)
    }
    }
    }
    module.exports = categorieController;
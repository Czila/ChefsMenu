const categorieSchema = require('../db/models/Categorie')
const {formValidateInfo} = require('../lib/verifForm')

const categorieController = {

    getCategories: (req,res) => {
        categorieSchema.find({}).then((categories)=>res.send(categories))
    },
    getCategoriesByRestaurant: (req,res) => {
        const idRestaurant = req.params.idRestaurant
        
        if (!formValidateInfo([idRestaurant]))
        {
        return res
          .status(400)
          .send({ success: false, message: "erreur ID" });
        }

        categorieSchema.find({idRestaurant}).then((categories)=>res.send(categories))
    },
    
    getCategorie: (req,res) => {
        const _id = req.params.id
        categorieSchema.find({_id}).then((categorie)=>res.send(categorie))
    },
    
    createCategorie: async (req, res) => {
     const {nom, idRestaurant } = req.body
     

     if (!formValidateInfo([nom,idRestaurant]))
     {
     return res
       .status(400)
       .send({ success: false, message: "Merci de vérifier vos informations" });
     }

    try {
     const categorie = new categorieSchema({
        nom,
        idRestaurant
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
        const {nom, idRestaurant } = req.body
    
    try {
        const categorieUpdate = await categorieSchema.findByIdAndUpdate(_id, {
            nom,
            idRestaurant
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
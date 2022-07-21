const elementSchema = require('../db/models/Element')


const elementController = {

getElements: (req,res) => {
    elementSchema.find({}).then((elements)=>res.send(elements))
},

getElement: (req,res) => {
    const _id = req.params.id
    elementSchema.find({_id}).then((element)=>res.send(element))
},

createElement: async (req, res) => {
 const {nom, prix_HT, tva, description, categorie} = req.body
try {
 const element = new elementSchema({
    nom,
    prix_HT,
    tva,
    description,
    categorie
 })

 await element.save()
 res.send(element)
}
catch(err)
{
    res.send(err.message)
}
},

updateElement: async (req,res) => {
    const _id = req.params.id
    const {nom, prix_HT, tva, description, categorie} = req.body
    console.log(req.params.id)

try {
    const elementUpdate = await elementSchema.findByIdAndUpdate(_id, {
        nom,
        prix_HT,
        tva,
        description,
        categorie
    })

    res.send(elementUpdate)
}

    catch(err)
{
    res.send(err.message)
}
},


deleteElement: async (req,res) => {
    const _id = req.params.id

try {
    const elementDelete = await elementSchema.deleteOne({_id: _id})

    res.send(elementDelete)
}

    catch(err)
{
    res.send(err.message)
}
}
}
module.exports = elementController;
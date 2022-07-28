const carteSchema = require('../db/models/Carte')


const carteController = {

getCartes: (req,res) => {
    carteSchema.find({}).then((cartes)=>res.send(cartes))
},

getCarte: (req,res) => {
    const _id = req.params.id
    carteSchema.find({_id}).then((carte)=>res.send(carte))
},

createCarte: async (req, res) => {
 const {menus, elements,idRestaurant} = req.body
try {
 const carte = new carteSchema({
    menus,
    elements,
    idRestaurant
 })
 
 await carte.save()
 res.send(carte)
}
catch(err)
{
    res.send(err.message)
}
},

updateCarte: async (req,res) => {
    const _id = req.params.id
    const {menus, elements} = req.body
    console.log(req.params.id)

try {
    const carteUpdate = await carteSchema.findByIdAndUpdate(_id, {
        menus,
        elements
    })

    res.send(carteUpdate)
}

    catch(err)
{
    res.send(err.message)
}
},


deleteCarte: async (req,res) => {
    const _id = req.params.id

try {
    const carteDelete = await carteSchema.deleteOne({_id: _id})

    res.send(carteDelete)
}

    catch(err)
{
    res.send(err.message)
}
}
}
module.exports = carteController;
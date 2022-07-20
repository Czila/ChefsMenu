const restaurantSchema = require('../db/models/Restaurant')


const restaurantController = {

getRestaurants: (req,res) => {
    restaurantSchema.find({}).then((restaurants)=>res.send(restaurants))
},

getRestaurant: (req,res) => {
    const _id = req.params.id
    restaurantSchema.find({_id}).then((restaurant)=>res.send(restaurant))
},

createRestaurant: async (req, res) => {
 const {nom, adresse, cp, ville, image, horaire, nbTable, idRestaurateur} = req.body
try {
 const restaurant = new restaurantSchema({
    nom,
    adresse,
    cp,
    ville,
    image,
    horaire,
    nbTable,
    idRestaurateur
 })

 await restaurant.save()
 res.send(restaurant)
}
catch(err)
{
    res.send(err.message)
}
},

updateRestaurant: async (req,res) => {
    const _id = req.params.id
    const {nom, adresse, cp, ville, image, horaire, nbTable, idRestaurateur} = req.body
    console.log(req.params.id)

try {
    const restaurantUpdate = await restaurantSchema.findByIdAndUpdate(_id, {
        nom,
        adresse,
        cp,
        ville,
        image,
        horaire,
        nbTable,
        idRestaurateur
    })

    res.send(restaurantUpdate)
}

    catch(err)
{
    res.send(err.message)
}
},


deleteRestaurant: async (req,res) => {
    const _id = req.params.id

try {
    const restaurantDelete = await restaurantSchema.deleteOne({_id: _id})

    res.send(restaurantDelete)
}

    catch(err)
{
    res.send(err.message)
}
}
}
module.exports = restaurantController;
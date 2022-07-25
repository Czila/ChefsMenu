const menuSchema = require('../db/models/Menu')


const menuController = {

getMenus: (req,res) => {
    menuSchema.find({}).then((menus)=>res.send(menus))
},

getMenu: (req,res) => {
    const _id = req.params.id
    menuSchema.find({_id}).then((menu)=>res.send(menu))
},

createMenu: async (req, res) => {
 const {nom, prix_HT, tva, plats, idRestaurateur} = req.body
try {
 const menu = new menuSchema({
    nom,
    prix_HT,
    tva,
    plats,
    idRestaurateur
 })

 await menu.save()
 res.send(menu)
}
catch(err)
{
    res.send(err.message)
}
},

updateMenu: async (req,res) => {
    const _id = req.params.id
    const {nom, prix_HT, tva, plats} = req.body
    console.log(req.params.id)

try {
    const menuUpdate = await menuSchema.findByIdAndUpdate(_id, {
        nom,
        prix_HT,
        tva,
        plats,
        idRestaurateur
    })

    res.send(menuUpdate)
}

    catch(err)
{
    res.send(err.message)
}
},


deleteMenu: async (req,res) => {
    const _id = req.params.id

try {
    const menuDelete = await menuSchema.deleteOne({_id: _id})

    res.send(menuDelete)
}

    catch(err)
{
    res.send(err.message)
}
}
}
module.exports = menuController;
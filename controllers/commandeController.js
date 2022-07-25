const commandeSchema = require('../db/models/Commande')


const commandeController = {

getCommandes: (req,res) => {
 commandeSchema.find({}).then((commandes)=>res.send(commandes))
},

getCommande: (req,res) => {
    const _id = req.params.id
    commandeSchema.find({_id}).then((carte)=>res.send(carte))
},

getCommandesByRestaurant: (req,res) => {
    const idRestaurant = req.params.idRestaurant
 
    commandeSchema.find({idRestaurant,etat:'enCours'}).then((commandes)=>
    {
        res.send(commandes)
    }
    )
},

createCommande: async (req, res) => {

 const {numTable,idRestaurant} = req.body   
    // on vérifie si le numTable est bien un nombre
    if (isNaN(numTable)) 
    {
        return res
                .status(400)
                .send({ success: false, message: "erreur de type de donnée" });
    }
    
    if (((await commandeSchema.find({numTable:numTable,etat:'enCours'})).length) > 0) 
    {
        return res
        .status(400)
        .send({ success: false, message: "Table déja en cours de commande" });
    }
    else
        try {
            const commande = new commandeSchema({
                numTable,
                idRestaurant
        })


    await commande.save()
    return res
        .status(200)
        .send({ success: true, message: commande._id });
    }
    catch(err)
    {
        res.send(err.message)
    }
},

addMenu: async (req,res) => {
    const _id = req.params.id
    const {menu} = req.body

try {
    const commandeUpdate = await commandeSchema.findByIdAndUpdate(_id, {
        $push: {menus : menu}
    }, {new: true})

    res.send(commandeUpdate)
}

    catch(err)
{
    res.send(err.message)
}
},

addElement: async (req,res) => {
    const _id = req.params.id
    const {element} = req.body

try {
    const commandeUpdate = await commandeSchema.findByIdAndUpdate(_id, {
        $push: {elements : element}
    }, {new: true})

    res.send(commandeUpdate)
}

    catch(err)
{
    res.send(err.message)
}
},

updateCommande: async (req,res) => {
    const _id = req.params.id
    const {etat} = req.body

try {
    const commandeUpdate = await commandeSchema.findByIdAndUpdate(_id, {
        etat
    })
    res.send(commandeUpdate)
}

    catch(err)
{
    res.send(err.message)
}
},


deleteCommande: async (req,res) => {
    const _id = req.params.id

try {
    const commandeDelete = await commandeSchema.find({_id: _id}).remove().exec();
    res.send(commandeDelete)
}

    catch(err)
{
    res.send(err.message)
    
}
}
}
module.exports = commandeController;
const restaurateurModel = require('../db/models/Restaurateur')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//controler des restaurateur
const restaurateurController = {
    getRestaurateurs : (req,res) => {
        restaurateurModel.find({}).then((restaurateurs) => res.send(restaurateurs));
    },   
    getRestaurateur : (req,res) => {
        const _id = req.params.id
        restaurateurModel.find({_id}).then((restaurateur) => res.send(restaurateur));
    },
    addRestaurateur : async (req, res) => {
        const {nom,prenom,mail} = req.body

        try{
            const motdepasse = await bcrypt.hash(req.body.motdepasse, 10)
            
            const restaurateur = new restaurateurModel({
            nom,
            prenom,
            mail,
            motdepasse
          })
          await restaurateur.save()
          res.send(restaurateur)
        }
        catch(err)
        {
            res.send(err.message)
        }
      },
    updateRestaurateur : async (req,res) => {
        const {nom,prenom,mail,motdepasse} = req.body
        const _id = req.params.id
        
        try {
        const restaurtateurUpdate = await restaurateurModel.findByIdAndUpdate(_id,{
            nom,
            prenom,
            mail,
            motdepasse
          })
        return restaurtateurUpdate
        }
        catch(err)
        {
            res.send(err.message)
        }
    },
    deleteRestaurateur : async (req,res) => {
        const id = req.params.id
        try {
             await restaurateurModel.deleteOne({_id: id})
             res.send('deleted') 
            }
            catch(err)
            {
                res.send(err.message)
            }
    },
    login : async (req,res) => {
        const {mail,motdepasse} = req.body 
        console.log(mail,motdepasse)
        const restaurateur = await restaurateurModel.findOne({mail:mail})
        if (!restaurateur){ return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'}) }
        
        const valid = await bcrypt.compare(motdepasse,restaurateur.motdepasse)

        if (!valid) {
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
        }
        else {
            res.status(200).json({
                userId: restaurateur._id,
                token: jwt.sign(
                    { userId: restaurateur._id},
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        }

    }

}

//exportation du controller
module.exports = restaurateurController;
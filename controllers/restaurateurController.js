const restaurateurModel = require('../db/models/Restaurateur')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {sendMail} = require('./../lib/mail')

const JWT_SECRET = process.env.JWT_SECRET;

//controler des restaurateur

const formValidateMAil = (mail) => {
    const emailVerif = RegExp(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      );
    return emailVerif.test(mail)
  }

  const formValidateInfo = (infos) => {
    let good=true
    infos.filter((info) => {if (info.length <= 0) good=false  })
    return good
  }

  const formValidatePass = (mdp) => {
    const passVerif = RegExp(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/
      );
    return passVerif.test(mdp)
  }


const restaurateurController = {
    getRestaurateurs : (req,res) => {
        restaurateurModel.find({}).then((restaurateurs) => res.send(restaurateurs));
    },   
    getRestaurateur : (req,res) => {
        const _id = req.params.id
        restaurateurModel.find({_id}).then((restaurateur) => res.send(restaurateur));
    },
    addRestaurateur : async (req, res) => {
        const {nom,prenom,mail, motdepasse} = req.body

        //vérification de l'email : 
        if (!formValidateInfo([nom,prenom,mail]))
        {
        return res
          .status(400)
          .send({ success: false, message: "Merci de vérifier vos informations" });
        }
        
        if (!formValidateMAil(mail)){
            return res
                .status(400)
                .send({ success: false, message: "Merci de vérifier votre mail" });
        }
        
        if (!formValidatePass(motdepasse)){
            return res
            .status(400)
            .send({ success: false, message: "Merci de vérifier votre mot de passe" });
        }
        
        try{
            const motdepasseBcrypt = await bcrypt.hash(motdepasse, 10)
            const restaurateur = new restaurateurModel({
            nom,
            prenom,
            mail,
            motdepasse: motdepasseBcrypt
          })
         await restaurateur.save()
         sendMail(restaurateur.mail, "inscription chez chef Menu", "Bonjour, Bienvenu chez chef menu. Bonne journée")
         res
         .status(200)
         .send({ success: true, message: "Restaurateur ajouter" });

        }
        catch(err)
        {
            console.log(err.message)
            res
            .status(500)
            .send({ success: false, message: err.message });
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

        if (!formValidateInfo([mail,motdepasse])){ return res.status(401).json({ message: 'Merci de saissir vos information'}) }
        
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
                    JWT_SECRET,
                    { expiresIn: '24h' }
                )
            });
        }

    }

}

//exportation du controller
module.exports = restaurateurController;
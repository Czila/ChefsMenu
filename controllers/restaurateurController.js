const restaurateurModel = require('../db/models/Restaurateur')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {sendMail} = require('./../lib/mail')
const {formValidateInfo,formValidateMAil,formValidatePass} = require('../lib/verifForm')

const JWT_SECRET = process.env.JWT_SECRET;


const restaurateurController = {
    getRestaurateurs : (req,res) => {
        restaurateurModel.find({}).then((restaurateurs) => res.send(restaurateurs));
    },   
    getRestaurateur : (req,res) => {
        
        if (req.params.id!==null) 
        {
            const _id = req.params.id.replace(/"/g, '')
            restaurateurModel.find({_id}).then((restaurateur) => res.send(restaurateur));
        }
        else
        {
            return res
                    .status(400)
                    .send({ success: false, message: "erreur de type de donnée" });
        }
    },

    updatePassword : async (req,res) => {
        const {mdp} = req.body
        const _id = req.params.id

        if (!formValidateInfo([mdp.mdp1,mdp.mdp2]))
        {
        return res
          .status(400)
          .send({ success: false, message: "Merci de vérifier votre mot de passe" });
        }        
        if((mdp.mdp1.length<=8)||(mdp.mdp2.length<=8)) 
        {
            return res
            .status(400)
            .send({ success: false, message: "Mot de passe trop petit" });
        }     
        if((mdp.mdp1)!==(mdp.mdp2)) 
        {
            return res
            .status(400)
            .send({ success: false, message: "Les mots de passe sont différents" });
        } 

        
        try {
            const motdepasseBcrypt = await bcrypt.hash(mdp.mdp1, 10)
            const restaurtateurUpdate = await restaurateurModel.findByIdAndUpdate(_id,{
                motdepasse: motdepasseBcrypt
          })

             res.send(restaurtateurUpdate)
        }
        catch(err)
        {
            res.send(err.message)
        }

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

    mdpResetJWT: async (req, res)=> {
        const {token} = req.body
        if (token)    
        jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
            if (error)
            {
              return res
                .status(400)
                .send({ success: false, message: "Erreur votre jeton n'est plus valide merci de refaire la procédure" });
              }
            let _id = decodedToken._id;
            restaurateurModel.findOne({ _id: _id  }).then((responseWithDataUserInsinde) => {
              if (responseWithDataUserInsinde === null)
                return res
                  .status(400)
                  .send({ success: false, message: "Pas de restaurateur associé" });
                  
                  return res
                  .status(200)
                  .send(responseWithDataUserInsinde._id);
            });
          });
    },

    mdpResetSendMail : async (req,res) => {
        const {mail} = req.body 

        if (mail)
        {
            restaurateurModel.find({mail}).then((restaurateur) => 
            {
                if (restaurateur) {
                    const tokenPass =jwt.sign(
                        { _id: restaurateur[0]._id},
                        JWT_SECRET,
                        { expiresIn: '1h' }
                    )
                    sendMail(restaurateur[0].mail, "Mot de passe oublier", "Voici le lien pour changer le votre mot de passe http://localhost:3000/changePass/" + tokenPass)
                    res.status(200).send(restaurateur)
                }
                else {res.status(400).send('mail inconnu')}

            })
        }
        else
        {
            return res
                    .status(400)
                    .send({ success: false, message: "erreur de type de donnée" });
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
            const token =jwt.sign(
                { userId: restaurateur._id},
                JWT_SECRET,
                { expiresIn: '24h' }
            )
            console.log(token)
            res.status(200).json({
                userId: restaurateur._id,
                token: token
            });
        }

    }

}

//exportation du controller
module.exports = restaurateurController;
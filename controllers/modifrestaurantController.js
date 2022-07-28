const modifrestaurantSchema = require('../db/models/Restaurant')
const categorieSchema = require('../db/models/Categorie')
const path = require("path")
const multer = require("multer")
const fs = require('fs')
const {formValidateInfo,formCP} = require('../lib/verifForm')

let storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,"img/imgRestaurant")
    },
    filename: function (req,file,cb) {
        cb(null,file.fieldname + ".jpg")
    }
})

const maxSize = 1 * 1000 * 1000;
let upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// mypic is the name of file attribute
}).single("myFile");   



const modifrestaurantController = {

uploadPicture: (req,res) => {  
    const _id = req.params.id   
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    let idmodifRestaurant='12345605446405640dd55'

    upload(req,res,function(err) {
        if(err) {
            res.send("err")
        }
        else {
            fs.rename('img/imgRestaurant/myFile.jpg', `img/imgRestaurant/${_id}.jpg`, () => {
                    console.log("\nFile Renamed!\n")})
            res.send({'id':_id})
            
        }
    })
},

getModifRestaurants: (req,res) => {
    modifrestaurantSchema.find({}).then((modifrestaurants)=>res.send(modifrestaurants))
},

getModifRestaurantsByOwner: (req,res) => {
    if (req.params.idOwner!==null) 
    {
        const idOwner = req.params.idOwner.replace(/"/g, '')
        modifrestaurantSchema.find({idmodifRestaurateur:idOwner}).then((modifrestaurants)=>res.send(modifrestaurants))
    }
    else
    {
        return res
                .status(400)
                .send({ success: false, message: "erreur de type de donnée" });
    }

},

getModifRestaurant: (req,res) => {
    const _id = req.params.id
    console.log(_id)
    modifrestaurantSchema.find({_id}).then((modifrestaurant)=>
    res.send(modifrestaurant))
},

createModifRestaurant: async (req, res) => {
 const {nom, adresse, cp, ville, image, nbTable } = req.body
 const idRestaurateur=req.body.idRestaurateur.replace(/"/g, '')


if (!formValidateInfo([nom, adresse, cp, ville, nbTable, idRestaurateur]))
 {
 return res
   .status(402)
   .send({ success: false, message: "Merci de vérifier vos informations" });
 }
 
if (!formCP(cp))
 {
 return res
   .status(402)
   .send({ success: false, message: "Merci de vérifier le code Postal" });
 }

try {
 const modifrestaurant = new modifrestaurantSchema({
    nom,
    adresse,
    cp,
    ville,
    image,
    nbTable,
    idRestaurateur
 })

 await modifrestaurant.save()
 
 res.send(restaurant)
 
}
catch(err)
{
     res.send(err.message)
    
}
},

updateModifRestaurant: async (req,res) => {
    const _id = req.params.id
    const {nom, adresse, cp, ville, image, horaire, nbTable, idRestaurateur} = req.body
try {
    const modifrestaurantUpdate = await modifrestaurantSchema.findByIdAndUpdate(_id, {
        nom,
        adresse,
        cp,
        ville,
        image,
        horaire,
        nbTable,
        idRestaurateur
    })

    res.send(modifrestaurantUpdate)
}

    catch(err)
{
    res.send(err.message)
}
},


deleteModifRestaurant: async (req,res) => {
    const _id = req.params.id

try {
    const modifrestaurantDelete = await modifrestaurantSchema.deleteOne({_id: _id})

    res.send(modifrestaurantDelete)
}

    catch(err)
{
    res.send(err.message)
}
}
}
module.exports = modifrestaurantController;
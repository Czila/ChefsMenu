const restaurantSchema = require('../db/models/Restaurant')
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



const restaurantController = {

uploadPicture: (req,res) => {  
    const _id = req.params.id   
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    let idRestaurant='12345605446405640dd55'

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

getRestaurants: (req,res) => {
    restaurantSchema.find({}).then((restaurants)=>res.send(restaurants))
},

getRestaurantsByOwner: (req,res) => {
    if (req.params.idOwner!==null) 
    {
        const idOwner = req.params.idOwner.replace(/"/g, '')
        restaurantSchema.find({idRestaurateur:idOwner}).then((restaurants)=>res.send(restaurants))
    }
    else
    {
        return res
                .status(400)
                .send({ success: false, message: "erreur de type de donnée" });
    }

},

getRestaurant: (req,res) => {
    const _id = req.params.id
    console.log(_id)
    restaurantSchema.find({_id}).then((restaurant)=>
    res.send(restaurant))
},

createRestaurant: async (req, res) => {
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
 const restaurant = new restaurantSchema({
    nom,
    adresse,
    cp,
    ville,
    image,
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
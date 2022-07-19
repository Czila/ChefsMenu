let express = require('express');
let router = express.Router();

const restaurateurModel = require('../db/models/Restaurateur')

addRestaurateur : async ({nom,prenom,mail,motdepasse}) => {
  try{
    const restaurateur = new restaurateurModel({
      nom,
      prenom,
      mail,
      motdepasse
    })
    await restaurateur.save()
    return (restaurateur)
    
  }
  catch(err)
  {
    return(err.message)
  }
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  restaurateurModel.find({}).then((restaurateurs) => res.send(restaurateurs));
});

router.get('/:mail', function(req, res, next) {
  const mail = req.params.mail
    restaurateurModel.find({mail : mail}).then((restaurateur) => res.send(restaurateur));
});

router.get('/:mail', function(req, res, next) {
  const mail = req.params.mail
    restaurateurModel.find({mail : mail}).then((restaurateur) => res.send(restaurateur));
});

router.update('/:_id', function(req, res, next) {

  });

router.delete('/:_id', function(req, res, next) {

  });

module.exports = router;

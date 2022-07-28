let express = require('express');
let router = express.Router();
const restaurantController = require('../controllers/modifrestaurantController')
const Auth =require('../middleware/auth')

/* GET users listing. */
router.get('/', Auth.isUser, modifrestaurantController.getModifRestaurants);

router.get('/byOwner/:idOwner', Auth.isUser, modifrestaurantController.getmodifRestaurantsByOwner);

router.post('/uploadPicture/:id',Auth.isUser,modifrestaurantController.uploadPicture);

router.get('/:id',Auth.isUser, modifrestaurantController.getModifRestaurant);

router.put('/',Auth.isUser, modifrestaurantController.createModifRestaurant);

router.put('/:id',Auth.isUser, modifrestaurantController.updateModifRestaurant);

router.delete('/:id',Auth.isUser, modifrestaurantController.deleteModifRestaurant);

module.exports = router;
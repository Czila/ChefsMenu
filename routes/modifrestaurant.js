let express = require('express');
let router = express.Router();
const restaurantController = require('../controllers/modifrestaurantController')
const Auth =require('../middleware/auth')

/* GET users listing. */
router.get('/', Auth.isUser, modifrestaurantController.getModifRestaurants);

router.get('/byOwner/:idOwner', Auth.isUser, modifrestaurantController.getmodifRestaurantsByOwner);

router.post('/uploadPicture/:id',Auth.isUser,modifrestaurantController.uploadPicture);

router.get('/:id',Auth.isUser, modifrestaurantController.getmodifRestaurant);

router.post('/',Auth.isUser, modifrestaurantController.createmodifRestaurant);

router.put('/:id',Auth.isUser, modifrestaurantController.updatemodifRestaurant);

router.delete('/:id',Auth.isUser, modifrestaurantController.deletemodifRestaurant);

module.exports = router;
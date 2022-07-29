let express = require('express');
let router = express.Router();
const restaurantController = require('../controllers/restaurantController')
const Auth =require('../middleware/auth')

/* GET users listing. */
router.get('/', restaurantController.getRestaurants);

router.get('/byOwner/:idOwner', Auth.isUser, restaurantController.getRestaurantsByOwner);

router.post('/uploadPicture/:id',Auth.isUser,restaurantController.uploadPicture);

router.get('/:id',restaurantController.getRestaurant);

router.get('/getPicture/:id', restaurantController.getPicture);

router.post('/',Auth.isUser, restaurantController.createRestaurant);

router.put('/:id',Auth.isUser, restaurantController.updateRestaurant);

router.delete('/:id',Auth.isUser, restaurantController.deleteRestaurant);

module.exports = router;
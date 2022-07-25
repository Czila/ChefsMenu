let express = require('express');
let router = express.Router();
const restaurantController = require('../controllers/restaurantController')
const Auth =require('../middleware/auth')

/* GET users listing. */
router.get('/', Auth.isUser, restaurantController.getRestaurants);

router.get('/byOwner/:idOwner', Auth.isUser, restaurantController.getRestaurantsByOwner);

router.get('/:id',Auth.isUser, restaurantController.getRestaurant);

router.post('/',Auth.isUser, restaurantController.createRestaurant);

router.put('/:id',Auth.isUser, restaurantController.updateRestaurant);

router.delete('/:id',Auth.isUser, restaurantController.deleteRestaurant);

module.exports = router;
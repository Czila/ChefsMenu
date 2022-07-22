let express = require('express');
let router = express.Router();
const restaurantController = require('../controllers/restaurantController')
const Auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', Auth, restaurantController.getRestaurants);

router.get('/:id', Auth, restaurantController.getRestaurant);

router.post('/', Auth, restaurantController.createRestaurant);

router.put('/:id', Auth, restaurantController.updateRestaurant);

router.delete('/:id', Auth, restaurantController.deleteRestaurant);


module.exports = router;
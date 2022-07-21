let express = require('express');
let router = express.Router();
const restaurantController = require('../controllers/restaurantController')


/* GET users listing. */
router.get('/', restaurantController.getRestaurants);

router.get('/:id', restaurantController.getRestaurant);

router.post('/', restaurantController.createRestaurant);

router.put('/:id', restaurantController.updateRestaurant);

router.delete('/:id', restaurantController.deleteRestaurant);


module.exports = router;
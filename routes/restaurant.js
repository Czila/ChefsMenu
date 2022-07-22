let express = require('express');
let router = express.Router();
const restaurantController = require('../controllers/restaurantController')
<<<<<<< HEAD
const Auth =require('../middleware/auth')

/* GET users listing. */
router.get('/', Auth.isUser, restaurantController.getRestaurants);

router.get('/:id',Auth.isUser, restaurantController.getRestaurant);

router.post('/',Auth.isUser, restaurantController.createRestaurant);

router.put('/:id',Auth.isUser, restaurantController.updateRestaurant);

router.delete('/:id',Auth.isUser, restaurantController.deleteRestaurant);
=======
const Auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', Auth, restaurantController.getRestaurants);

router.get('/:id', Auth, restaurantController.getRestaurant);

router.post('/', Auth, restaurantController.createRestaurant);

router.put('/:id', Auth, restaurantController.updateRestaurant);

router.delete('/:id', Auth, restaurantController.deleteRestaurant);
>>>>>>> a0bc7df3dcc95af80042fb8d28f7c9e5bfd96049


module.exports = router;
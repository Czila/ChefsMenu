let express = require('express');
let router = express.Router();
const elementController = require('../controllers/elementController')
const Auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', Auth.isUser, elementController.getElements);

router.get('/:id', Auth.isUser, elementController.getElement);

router.post('/', Auth.isUser, elementController.createElement);

router.put('/:id', Auth.isUser, elementController.updateElement);

router.get('/ByRestaurant/:idRestaurant', Auth.isUser, elementController.getElementByRestaurant);

router.delete('/:id', Auth.isUser, elementController.deleteElement);


module.exports = router;

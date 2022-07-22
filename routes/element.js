let express = require('express');
let router = express.Router();
const elementController = require('../controllers/elementController')
const Auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', Auth, elementController.getElements);

router.get('/:id', Auth, elementController.getElement);

router.post('/', Auth, elementController.createElement);

router.put('/:id', Auth, elementController.updateElement);

router.delete('/:id', Auth, elementController.deleteElement);


module.exports = router;

let express = require('express');
let router = express.Router();
const elementController = require('../controllers/elementController')

/* GET users listing. */
router.get('/', elementController.getElements);

router.get('/:id', elementController.getElement);

router.post('/', elementController.createElement);

router.put('/:id', elementController.updateElement);

router.delete('/:id', elementController.deleteElement);


module.exports = router;

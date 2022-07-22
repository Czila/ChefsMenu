let express = require('express');
let router = express.Router();
const carteController = require('../controllers/carteController')
const Auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', Auth, carteController.getCartes);

router.get('/:id', Auth, carteController.getCarte);

router.post('/', Auth, carteController.createCarte);

router.put('/:id', Auth, carteController.updateCarte);

router.delete('/:id', Auth, carteController.deleteCarte);


module.exports = router;
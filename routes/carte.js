let express = require('express');
let router = express.Router();
const carteController = require('../controllers/carteController')
const Auth = require('../middleware/auth')

/* GET users listing. */
router.get('/',  carteController.getCartes);

router.get('/:id', carteController.getCarte);

router.post('/', Auth.isUser, carteController.createCarte);

router.put('/:id', Auth.isUser, carteController.updateCarte);

router.delete('/:id', Auth.isUser, carteController.deleteCarte);


module.exports = router;
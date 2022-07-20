let express = require('express');
let router = express.Router();
const carteController = require('../controllers/carteController')

/* GET users listing. */
router.get('/', carteController.getCartes);

router.get('/:id', carteController.getCarte);

router.post('/', carteController.createCarte);

router.put('/:id', carteController.updateCarte);

router.delete('/:id', carteController.deleteCarte);


module.exports = router;
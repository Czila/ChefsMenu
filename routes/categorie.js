let express = require('express');
let router = express.Router();
const categorieController = require('../controllers/categorieController')
const Auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', Auth, categorieController.getCategories);

router.get('/:id', Auth, categorieController.getCategorie);

router.post('/', Auth, categorieController.createCategorie);

router.put('/:id', Auth, categorieController.updateCategorie);

router.delete('/:id', Auth, categorieController.deleteCategorie);


module.exports = router;
let express = require('express');
let router = express.Router();
const categorieController = require('../controllers/categorieController')


/* GET users listing. */
router.get('/', categorieController.getCategories);

router.get('/:id', categorieController.getCategorie);

router.post('/', categorieController.createCategorie);

router.put('/:id', categorieController.updateCategorie);

router.delete('/:id', categorieController.deleteCategorie);


module.exports = router;
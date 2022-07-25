let express = require('express');
let router = express.Router();
const categorieController = require('../controllers/categorieController')
const Auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', Auth.isUser, categorieController.getCategories);

router.get('/:id', Auth.isUser, categorieController.getCategorie);

router.post('/', Auth.isUser, categorieController.createCategorie);

router.put('/:id', Auth.isUser, categorieController.updateCategorie);

router.delete('/:id', Auth.isUser, categorieController.deleteCategorie);


module.exports = router;
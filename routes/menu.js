let express = require('express');
let router = express.Router();
const menuController = require('../controllers/menuController')
const Auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', Auth.isUser, menuController.getMenus);

router.get('/:id', Auth.isUser, menuController.getMenu);

router.get('/ByRestaurant/:idRestaurant', Auth.isUser, menuController.getMenuByRestaurant);

router.post('/', Auth.isUser, menuController.createMenu);

router.put('/:id', Auth.isUser, menuController.updateMenu);

router.delete('/:id', Auth.isUser, menuController.deleteMenu);


module.exports = router;
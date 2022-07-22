let express = require('express');
let router = express.Router();
const menuController = require('../controllers/menuController')
const Auth = require('../middleware/auth')

/* GET users listing. */
router.get('/', Auth, menuController.getMenus);

router.get('/:id', Auth, menuController.getMenu);

router.post('/', Auth, menuController.createMenu);

router.put('/:id', Auth, menuController.updateMenu);

router.delete('/:id', Auth, menuController.deleteMenu);


module.exports = router;
let express = require('express');
let router = express.Router();
const menuController = require('../controllers/menuController')

/* GET users listing. */
router.get('/', menuController.getMenus);

router.get('/:id', menuController.getMenu);

router.post('/', menuController.createMenu);

router.put('/:id', menuController.updateMenu);

router.delete('/:id', menuController.deleteMenu);


module.exports = router;
let express = require('express');
let router = express.Router();
const commandeController = require('../controllers/commandeController')

/* GET users listing. */
router.get('/', commandeController.getCommandes);


router.get('/restaurant/:idRestaurant', commandeController.getCommandesByRestaurant);

router.get('/:id',commandeController.getCommande );

router.post('/',commandeController.createCommande);

router.put('/:id', commandeController.updateCommande );

router.put('/addMenu/:id', commandeController.addMenu );

router.put('/addElement/:id', commandeController.addElement );

router.delete('/:id',);


module.exports = router;
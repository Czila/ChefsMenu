let express = require('express');
let router = express.Router();

const restaurateurController = require('../controllers/restaurateurController')

/* GET users listing. */
router.get('/',restaurateurController.getRestaurateurs);

router.get('/login',restaurateurController.login);

router.get('/:id',restaurateurController.getRestaurateur);


router.post('/',restaurateurController.addRestaurateur);

router.put('/:_id',restaurateurController.updateRestaurateur);

router.delete('/:_id', restaurateurController.deleteRestaurateur);


module.exports = router;

let express = require('express');
let router = express.Router();
const restaurateurController = require('../controllers/restaurateurController')
const Auth = require('../middleware/auth')

/* GET users listing. */
router.get('/',restaurateurController.getRestaurateurs);

router.post('/login',restaurateurController.login);

router.get('/:id',restaurateurController.getRestaurateur);

router.post('/',restaurateurController.addRestaurateur);

router.put('/:_id', Auth, restaurateurController.updateRestaurateur);

router.delete('/:_id', Auth, restaurateurController.deleteRestaurateur);


module.exports = router;

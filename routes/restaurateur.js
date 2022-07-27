let express = require('express');
let router = express.Router();
const restaurateurController = require('../controllers/restaurateurController')
const Auth = require('../middleware/auth')

/* GET users listing. */
router.get('/',restaurateurController.getRestaurateurs);

router.post('/login',restaurateurController.login);

router.get('/:id',restaurateurController.getRestaurateur);

router.post('/',restaurateurController.addRestaurateur);

router.post('/resetpass',restaurateurController.mdpResetSendMail);

router.post('/resetpassjwt',restaurateurController.mdpResetJWT);

router.put('/:_id', Auth.isUser, restaurateurController.updateRestaurateur);

router.delete('/:_id', Auth.isUser, restaurateurController.deleteRestaurateur);


module.exports = router;

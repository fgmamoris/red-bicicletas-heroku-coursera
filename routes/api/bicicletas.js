var express = require('express');
var router = express.Router();
var bicicletaControllerApi = require('../../controllers/api/bicicletaControllerApi');

router.get('/', bicicletaControllerApi.bicicleta_list);
router.post('/create', bicicletaControllerApi.bicicleta_create);
router.delete('/delete', bicicletaControllerApi.bicicleta_delete);

module.exports = router;
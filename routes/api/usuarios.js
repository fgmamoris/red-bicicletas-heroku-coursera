var express = require("express");
var router = express.Router();
var usuarioControllerApi = require("../../controllers/api/usuarioControllerApi");

router.get("/", usuarioControllerApi.usuarios_list);
router.post("/create", usuarioControllerApi.usuarios_create);
router.delete("/delete_usuario", usuarioControllerApi.usuarios_delete);

router.post("/reservar", usuarioControllerApi.usuarios_reservar);

module.exports = router;

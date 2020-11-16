var express = require("express");
var router = express.Router();
var usuarioControllerApi = require("../../controllers/api/usuarioControllerApi");

router.get("/", usuarioControllerApi.usuarios_list);
router.post("/create", usuarioControllerApi.usuarios_create);
router.delete("/reservar", usuarioControllerApi.usuario_reservar);
// router.delete("/delete", usuarioControllerApi.usuarios_delete);
// router.patch("/update", usuarioControllerApi.usuarios_update);

module.exports = router;

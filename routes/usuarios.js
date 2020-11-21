var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get("/", usuarioControllerApi.usuarios_list);
router.get("/create", usuarioControllerApi.usuarios_create_get);
router.post("/create", usuarioControllerApi.usuarios_create);
router.get("/:id/update", usuarioControllerApi.usuarios_update_get);
router.post("/:id/update", usuarioControllerApi.usuarios_update);
router.delete("/delete_usuario", usuarioControllerApi.usuarios_delete);
// router.delete("/:id/delete", usuarioControllerApi.usuarios_delete);
router.post("/reservar", usuarioControllerApi.usuarios_reservar);

module.exports = router;

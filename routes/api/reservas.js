var express = require("express");
var router = express.Router();
var reservasControllerApi = require("../../controllers/api/reservasControllerApi");

router.get("/", reservasControllerApi.reservas_list);
router.delete("/delete", reservasControllerApi.reservas_delete);
router.patch("/update", reservasControllerApi.reservas_update);

module.exports = router;

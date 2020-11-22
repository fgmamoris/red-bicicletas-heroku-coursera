var express = require("express");
var router = express.Router();
var authControllerApi = require("../../controllers/api/authControllerApi");

router.post("/authenticate", authControllerApi.authenticate);
router.post("/forgotPassword", authControllerApi.forgotPassword);

module.exports = router;

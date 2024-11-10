const express = require("express");
const router = express.Router();
const {adminlogin,validateLogin} = require("../AdminControllers/admincontrol");

router.get("/",validateLogin);

router.post("/login",adminlogin);

module.exports = router;
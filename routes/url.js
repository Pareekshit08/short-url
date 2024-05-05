const express = require('express');
const { handleGenerateNewShortURL } = require("../controllers/url");
const router = express.Router();

router.post('/check',handleGenerateNewShortURL);

module.exports = router;
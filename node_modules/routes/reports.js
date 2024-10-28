// routes/reports.js

const express = require('express');
const router = express.Router();
const { reportUmbrella } = require('/controllers/reportsController');

// Report a damaged or lost umbrella
router.post('/', reportUmbrella);

module.exports = router;

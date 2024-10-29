// routes/umbrellas.js

const express = require('express');
const router = express.Router();
const {
  listAvailableUmbrellas,
  rentUmbrella,
  returnUmbrella
} = require('../controllers/umbrellasController');

// List available umbrellas
router.get('/available', listAvailableUmbrellas);

// Rent an umbrella
router.post('/rent', rentUmbrella);

// Return an umbrella
router.post('/return', returnUmbrella);

module.exports = router;

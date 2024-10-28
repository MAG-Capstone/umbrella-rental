// routes/stations.js

const express = require('express');
const router = express.Router();
const {
  listStations,
  getStationDetails
} = require('../controllers/stationsController');

// List all stations
router.get('/', listStations);

// Get station details
router.get('/:station_id', getStationDetails);

module.exports = router;

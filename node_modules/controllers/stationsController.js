// controllers/stationsController.js

const pool = require('../db');

// List all stations
exports.listStations = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM stations');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get station details
exports.getStationDetails = async (req, res) => {
  const { station_id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM stations WHERE station_id = $1',
      [station_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

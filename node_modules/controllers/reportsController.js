// controllers/reportsController.js

const pool = require('../db');

// Report a damaged or lost umbrella
exports.reportUmbrella = async (req, res) => {
  const { umbrella_id, description } = req.body;

  try {
    await pool.query(
      'INSERT INTO reports (umbrella_id, description, report_date) VALUES ($1, $2, NOW())',
      [umbrella_id, description]
    );
    res.json({ message: 'Report submitted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

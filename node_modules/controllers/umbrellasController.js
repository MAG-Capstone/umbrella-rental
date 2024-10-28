// controllers/umbrellasController.js

const pool = require('../db');

// List available umbrellas
exports.listAvailableUmbrellas = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM umbrellas WHERE status = 'available'"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Rent an umbrella
exports.rentUmbrella = async (req, res) => {
  const { umbrella_id, station_id } = req.body;
  const user_id = req.user.user_id; // Assuming user ID is stored in the request

  try {
    await pool.query(
      "UPDATE umbrellas SET status = 'rented' WHERE umbrella_id = $1",
      [umbrella_id]
    );
    await pool.query(
      'INSERT INTO rental_logs (user_id, umbrella_id, station_id, rental_time) VALUES ($1, $2, $3, NOW())',
      [user_id, umbrella_id, station_id]
    );
    res.json({ message: 'Umbrella rented successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Return an umbrella
exports.returnUmbrella = async (req, res) => {
  const { umbrella_id, station_id } = req.body;
  const user_id = req.user.user_id; // Assuming user ID is stored in the request

  try {
    await pool.query(
      "UPDATE umbrellas SET status = 'available' WHERE umbrella_id = $1",
      [umbrella_id]
    );
    await pool.query(
      'UPDATE rental_logs SET return_time = NOW() WHERE user_id = $1 AND umbrella_id = $2 AND station_id = $3',
      [user_id, umbrella_id, station_id]
    );
    res.json({ message: 'Umbrella returned successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

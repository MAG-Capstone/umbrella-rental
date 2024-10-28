// controllers/authController.js

const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User login
exports.loginUser = async (req, res) => {
  const { universityID, password } = req.body;

  try {
    // Find the user in the database
    const result = await pool.query(
      'SELECT * FROM users WHERE university_id = $1',
      [universityID]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { user_id: user.user_id, university_id: user.university_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

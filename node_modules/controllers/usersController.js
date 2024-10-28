// controllers/usersController.js

const pool = require('../db'); // Importa la conexión a la base de datos
const bcrypt = require('bcrypt');

// Controller para registrar un usuario
exports.registerUser = async (req, res) => {
  const { universityID, password, name, email } = req.body;

  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos
    await pool.query(
      'INSERT INTO users (university_id, password, name, email) VALUES ($1, $2, $3, $4)',
      [universityID, hashedPassword, name, email]
    );

    // Responder con un mensaje de éxito
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

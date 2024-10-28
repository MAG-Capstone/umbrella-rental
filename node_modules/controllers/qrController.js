// controllers/qrController.js

const pool = require('../db');

// Generate QR code for rental
exports.generateQrForRental = async (req, res) => {
  const { umbrella_id, station_id, user_id } = req.body;

  // Here, you would generate a real QR code
  const qr_code = Buffer.from(`${umbrella_id}-${station_id}-${user_id}`).toString('base64');

  res.json({ qr_code, expiration_time: new Date(Date.now() + 60000) });
};

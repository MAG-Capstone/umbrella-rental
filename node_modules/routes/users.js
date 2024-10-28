// routes/users.js

const express = require('express');
const router = express.Router();

// Sample user route (for testing purposes)
router.get('/', (req, res) => {
  res.send('User route working!');
});

module.exports = router;

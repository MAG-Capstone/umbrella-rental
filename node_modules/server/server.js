const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/umbrellas', require('./routes/umbrellas'));
app.use('/api/stations', require('./routes/stations'));
app.use('/api/qr', require('./routes/qr'));
app.use('/api/reports', require('./routes/reports'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


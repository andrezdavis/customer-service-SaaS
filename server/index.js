const express = require('express');
const cors = require('cors');
require('dotenv').config();
const companyRoutes = require('./routes/company');
const authRoutes = require('./routes/auth')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for dev
app.use(express.json()); // Parse JSON body

app.use('/api', companyRoutes); // Register your route
app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

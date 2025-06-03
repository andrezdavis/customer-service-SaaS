const express = require('express');
const router = express.Router();
require('dotenv').config();

router.post('/company', async (req, res) => {
  try {
    const { name, rules, guidelines, values } = req.body;
    const email = req.headers['email'];

    const response = await fetch(process.env.EXTERNAL_API_URL, {
      method: 'POST',
      headers: {
        'email': email,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, rules, guidelines, values }),
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: data.message || 'Upstream error' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal error' });
  }
});

module.exports = router;

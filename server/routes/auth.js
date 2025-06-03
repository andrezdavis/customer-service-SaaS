const express = require('express');
const router = express.Router();
require('dotenv').config();

router.get('/logout', async (req, res) => {
  const cognitoDomain = process.env.COGNITO_DOMAIN;
  const clientId = process.env.COGNITO_CLIENT_ID;
  const logoutUri = encodeURIComponent(process.env.COGNITO_LOGOUT_REDIRECT_URI);

  const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
  return res.redirect(logoutUrl);
});

module.exports = router;
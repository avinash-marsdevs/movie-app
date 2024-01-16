const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  server.use('/api/v1', require('./pages/api/v1'));

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${PORT}`);
  });
});

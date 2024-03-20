// Node.js server (server.js)
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());

app.get('/unblock', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('No URL provided');
  }
  try {
    const response = await fetch(url);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(500).send('Error fetching the URL');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

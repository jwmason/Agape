// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Add a basic route for the root path
app.get('/', (req, res) => {
  res.send('Hello, this is your server!');
});

// Your API route
app.post('/api/openai', async (req, res) => {
  try {
    const apiKey = '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';
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error making request to OpenAI API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

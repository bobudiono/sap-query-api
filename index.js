require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/query', async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const sql = req.body.sql;
  if (!sql) {
    return res.status(400).json({ error: 'SQL is required' });
  }

  try {
    // TODO: Replace this with actual SAP HANA query
    console.log('Received SQL:', sql);

    const mockResponse = {
      rows: [{ user: 'DWC_USER' }],
      columns: ['user'],
      rowCount: 1
    };

    return res.json(mockResponse);
  } catch (err) {
    console.error('Query error:', err);
    return res.status(500).json({ error: 'Query failed' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`API running on port ${process.env.PORT}`);
});


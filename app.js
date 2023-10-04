require('dotenv').config();
const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use('/api/v1', require('./routes'));
app.get('/api/health', (req, res) => res.send('OK'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

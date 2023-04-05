const path = require('path');
const express = require('express');
const cors = require('cors');
const router = require('./routes/route.js');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use('/api', router);

app.use(express.static(path.join(__dirname, '../build')));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

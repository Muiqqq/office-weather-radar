const path = require('path');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const apicache = require('apicache');
const router = require('./routes/route.js');

const cache = apicache.middleware;

const PORT = process.env.PORT || 8080;

const app = express();

const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 10 minutes
  max: 100,
});
app.use(limiter);
app.set('trust proxy', 1);

app.use(cache('4 minutes'));

app.use(cors());

app.use('/api', router);

app.use(express.static(path.join(__dirname, '../build')));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

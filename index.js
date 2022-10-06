const express = require('express');
const bearerToken = require('express-bearer-token');
const cors = require('cors');
const router = require('./routes/routes');
const app = express();
const port = 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(router);
app.use(bearerToken());

app.listen(port, () => { 
  console.log(`Server starts on port ${port}`) 
});
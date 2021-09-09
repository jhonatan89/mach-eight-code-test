const express = require('express');
const router = require('./src/router');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/app', router);
app.use('/', (req, resp) => {
  resp.sendFile(__dirname + 'public/index.html');
});

app.listen(3000, () => {
  console.log('Server on http://localhost:3000');
});

const path = require('path');
const express = require('express');
const app = express();

app.use('/images', express.static(path.join(__dirname, 'public/images')));
spp.listen(8080);

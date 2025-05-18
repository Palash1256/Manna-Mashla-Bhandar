const express = require('express');
const app = express();
const routes = require('./routes');
require('dotenv').config();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

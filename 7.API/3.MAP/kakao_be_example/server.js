const express = require('express');
const path = require('path');
const morgan = require('morgan');
const { getSeoulPopulationData } = require('./seoul');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/api/seoul', (req, res) => {
    const seoulData = getSeoulPopulationData();
    res.json(seoulData);
});

app.listen(port, () => {
    console.log('서버 레디');
});

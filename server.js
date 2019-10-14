const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');

const app = express();
const root = process.env.PWD;
const port = process.env.PORT || 4000;

app.use(express.static(path.resolve(root, 'build')));
app.use(favicon(path.join(root, 'assets', 'favicon.ico')));

app.get('/*', (req, res) => {
    res.sendFile('index.html');
});

app.listen(port, () => console.log(`Listening ${port}`));
const express = require('express');
const app = express();
const port = process.argv[2] || 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));





































app.get('/api/reload', (req, res) => {
    // console.log('Well', process.env.BROWSER_REFRESH_URL);
    res.send(process.env.BROWSER_REFRESH_URL);
})

app.get('/*', (req, res) => {
    console.log('DEFAULT');
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(port, (err) => {
    if(err) {
        console.error('LAUNCHING ERROR :  ', err);
    }
    console.log(`Listen on port ${port}`);
    if (process.send) {
        process.send({ event:'online', url:`http://localhost:${port}/` });
    }
})
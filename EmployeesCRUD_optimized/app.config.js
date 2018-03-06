const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const employe = require('./routes/employe');
const status = require('./routes/status');
const position = require('./routes/position');

module.exports.define = (app) => {
   
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json({limit:10485760}));

    app.use('/api/status', status);
    app.use('/api/position', position);
    app.use('/api/employe', employe);

    
   

   
    

    
    
}

module.exports.listen = (app, setPort) => {

    const port = setPort || 3000;
    
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
        console.log(`Listen on port ${port}`,  '\n');
        if (process.send) {
            process.send({ event:'online', url:`http://localhost:${port}/` });
        }
    })
}
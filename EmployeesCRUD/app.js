const fs = require('fs');
const express = require('express');
const app = express();
const port = process.argv[2] || 3000;
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');


    mongoose.connect('mongodb://localhost:27017/employeesDB');
    
const db = mongoose.connection;
    db.on('error', () => {
        console.error('Data base => Connection fallied!', '\n')
    });
    db.once('open', () => {
        console.log('Data base => Open connection ...', '\n');
    })

const employeSchema = mongoose.Schema({
    name: {
        firstName: {type: String},
        lastName: {type: String}
    },
    email: {type: String, unique: false},
    normatives: {
        availability: [{type: String}],
        position: {type: mongoose.Schema.Types.ObjectId, ref: 'Position'},
        status: {type: mongoose.Schema.Types.ObjectId, ref: 'Status'},
        hoursPerWeekLeft: {type: Number}
    },
    photo: String 
});
const Employe = mongoose.model('Employe', employeSchema);

const positionSchema = mongoose.Schema({
    position: String,
    // employess: [{type: mongoose.Schema.ObjectId, ref: 'Employe'}]
});
const Position = mongoose.model('Position', positionSchema);

const statusSchema = mongoose.Schema({
    status: String,
    // employess: [{type: mongoose.Schema.ObjectId, ref: 'Employe'}]
});
const Status = mongoose.model('Status', statusSchema);


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit:10485760}));




app.get('/api/position', (req, res) => {
    Position
        .find({})
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((err) => {
            console.error(err)
        })
})

app.post('/api/position', (req, res) => {
    console.log(req.body);
    new Position(req.body)
        .save()
        .then((result) => {
            res.json(result)
        })
        .catch(console.error)
})

app.get('/api/status', (req, res) => {
    Status
        .find({})
        .then((data) => {
            console.log(req.data)
            res.json(data)
        })
        .catch((err) => {
            console.error(err)
        })
})

app.post('/api/status', (req, res) => {
    console.log(req.body);
    new Status(req.body)
        .save()
        .then((result) => {
            res.json(result)
        })
        .catch(console.error)
})

app.get('/api/employe', (req, res) => {
    let skip = req.query.rate * 10;
    let limit = 10; 
    console.log(req.query)
    // res.end()
    Employe
        .find({}, null, {
            skip: skip,
            limit: limit
        })
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((err) => {
            console.error(err)
        })
})



app.get('/api/employe/amount', (req, res) => {
    Employe.count((err, c) => {
        if(err) {
            console.error(err)
        }
        console.log("COUNT_---------", c)
        res.json(c);
    });
})  


app.get('/api/employe/:id', (req, res) => {

    Employe
        .findById(req.params.id)
        .populate({
            path: 'normatives.status',
            select: {
                __v: 0
            }
        })
        .populate({
            path: 'normatives.position',
            select: {
                __v: 0
            }
        })
        .exec((err, employe) => {
            if(err) {
                console.error(err)
            }
            console.log('178 RESPONSE WITH ----------------------', employe)
                res.json(employe)
        })
})

app.post('/api/employe', (req, res, next) => {
    console.log('-----------1st');
    if(req.body.photo && req.body.photo.match(/^data/) ) {
        req.body.photo = req.body.photo.replace(/^data:image\/jpeg;base64,/, "")
        console.log('-----------2nd');
        fs.writeFile(`public/photo/${req.body.name.firstName}${req.body.name.lastName}.jpeg`, req.body.photo, 'base64',(err) => {
            if(err) {
                console.error(err)
                console.log('-----------3rd');
            } else {
                req.body.photo = `${req.protocol}://${req.get('host')}/photo/${req.body.name.firstName}${req.body.name.lastName}.jpeg`;
                console.log('-----------4th', req.body.photo);
                next()
            }
        });
    } else if (!req.body.photo){
        req.body.photo = `${req.protocol}://${req.get('host')}/photo/mask.png`
        next();
    } else {
        next()
    }
}, (req, res) => {
    console.log('-----------5th', req.body.photo );

    new Employe(req.body)
        .save()
        .then((result) => {
            console.log('Save As : ', '\n', result)
            res.json(result)
        })
        .catch(console.error)
})

app.put('/api/employe/:id', (req, res, next) => {
    console.log('-----------1st');
    if(req.body.photo && req.body.photo.match(/^data/) ) {
        req.body.photo = req.body.photo.replace(/^data:image\/jpeg;base64,/, "")
        console.log('-----------2nd');
        fs.writeFile(`public/photo/${req.body.name.firstName}${req.body.name.lastName}.jpeg`, req.body.photo, 'base64',(err) => {
            if(err) {
                console.error(err)
                console.log('-----------3rd');
            } else {
                req.body.photo = `${req.protocol}://${req.get('host')}/photo/${req.body.name.firstName}${req.body.name.lastName}.jpeg`;
                console.log('-----------4th', req.body.photo);
                next()
            }
        });
    } else if (!req.body.photo){
        req.body.photo = `${req.protocol}://${req.get('host')}/photo/mask.png`
        next();
    } else {
        next()
    }
}, (req, res) => {
    console.log('-----------5th', req.body);
    // res.end();
    Employe.findOneAndUpdate({_id: req.params.id}, req.body)
        .then((result) => {
            console.log('Save As : ', '\n', result)
            res.json(result)
        })
        .catch(console.error)
})

app.delete('/api/employe/:id', (req, res, next) => {
    console.log("PARAMS ----------------- :", req.params)
    Employe.remove({_id: req.params.id}, (err, removed) => {
        if(err) {
            console.error();
        }
        console.log(removed);
        res.json(removed);
    })
})



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
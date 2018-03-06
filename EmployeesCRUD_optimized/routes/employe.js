const fs = require('fs');
const express = require('express');
const app = express();
const employeRouter = express.Router();

const Employe = require('../models/Employe');

employeRouter
    .route('/')
    .get((req, res) => {
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
    });


employeRouter
    .route('/amount')
    .get((req, res) => {
        Employe.count((err, c) => {
            if(err) {
                console.error(err)
            }
            console.log("COUNT_---------", c)
            res.json({"amount": c});
        });
    });
employeRouter
    .route('/:id')
    .get((req, res) => {

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
    });
employeRouter
    .route('/')
    .post((req, res, next) => {
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
    });
employeRouter
    .route('/:id')
    .put((req, res, next) => {
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

employeRouter.delete('/:id', (req, res, next) => {
    console.log("PARAMS ----------------- :", req.params)
    Employe.remove({_id: req.params.id}, (err, removed) => {
        if(err) {
            console.error();
        }
        console.log(removed);
        res.json(removed);
    })
})
module.exports = employeRouter;
const express = require('express');
const app = express();
const positionRouter = express.Router();

const Position = require('../models/Position');

positionRouter
    .route('/')
    .get((req, res) => {
        Position
            .find({})
            .then((data) => {
                console.log(req.data)
                res.json(data)
            })
            .catch((err) => {
                console.error(err)
            })
    })
positionRouter
    .route('/')
    .post((req, res) => {
        console.log(req.body);
        new Position(req.body)
            .save()
            .then((result) => {
                res.json(result)
            })
            .catch(console.error)
    })
module.exports = positionRouter;
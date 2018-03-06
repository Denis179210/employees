const express = require('express');
const app = express();
const statusRouter = express.Router();

const Status = require('../models/Status');

statusRouter
    .route('/')
    .get((req, res) => {
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
statusRouter
    .route('/')
    .post((req, res) => {
        console.log(req.body);
        new Status(req.body)
            .save()
            .then((result) => {
                res.json(result)
            })
            .catch(console.error)
    })
module.exports = statusRouter;
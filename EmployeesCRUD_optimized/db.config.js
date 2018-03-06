const mongodb = require('mongodb');
const mongoose = require('mongoose');

module.exports.connect = (dataBase) => {
mongoose.connect(`mongodb://localhost:27017/${dataBase}`);
    
const db = mongoose.connection;
    db.on('error', () => {
        console.error('Data base => Connection fallied!', '\n')
    });
    db.once('open', () => {
        console.log('Data base => Open connection ...', '\n');
    })
}
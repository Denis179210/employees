const mongoose = require('mongoose');
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
module.exports = Employe;
const mongoose = require('mongoose');
const statusSchema = mongoose.Schema({
    status: String,
    // employess: [{type: mongoose.Schema.ObjectId, ref: 'Employe'}]
});
const Status = mongoose.model('Status', statusSchema);
module.exports = Status;
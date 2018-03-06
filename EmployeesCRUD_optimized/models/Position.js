const mongoose = require('mongoose');
const positionSchema = mongoose.Schema({
    position: String,
    // employess: [{type: mongoose.Schema.ObjectId, ref: 'Employe'}]
});
const Position = mongoose.model('Position', positionSchema);
module.exports = Position;
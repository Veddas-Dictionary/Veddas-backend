const mongoose = require('mongoose');

const WordSchema = mongoose.Schema({
    VedSi: {
     type: String,
     required: true
    },
    VedTa: {
        type: String,
        required: true
       },
    Si: String,
    Ta: String,
    En: String
    },
    {
        collection:'Sugesstions'
    }
);

module.exports = mongoose.model('Word', WordSchema);

const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    title: {
     type: String,
     required: true
    },
    description: String,
    closingDate: String,
    requirements: Array
    }
);

module.exports = mongoose.model('Job', JobSchema);

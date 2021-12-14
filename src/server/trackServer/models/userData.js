const { compareSync } = require('bcrypt');
const mongoose = require('mongoose');

const userData = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    status: {
        type: String
    },
    cycleNum: {
        type: Number
    },
    phone: {
        type: Number
    },
    locationStartTime: {
        type: String
    },
    locationStartLat:{
        type: Number
    },
    locationStartLong:{
        type: Number
    },
    locationEndTime: {
        type: String
    },
    locationEndLat:{
        type: Number
    },
    locationEndLong:{
        type: Number
    },
    balance:{
        type: Number
    }
});

mongoose.model('UserData', userData);
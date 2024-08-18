const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name : {type: String, required: true},
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
    isDeleted : {type: Boolean, default: false},
    createdAt : {type: Date, default : Date.now},  //new Date().getTime()
    updatedAt : {type: Date, default : Date.now},  //new Date().getTime()
});

module.exports = mongoose.model("users", usersSchema);
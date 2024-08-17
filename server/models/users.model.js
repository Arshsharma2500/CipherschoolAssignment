const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name : {type: String},
    email : {type: String},
    password : {type: String},
    isDeleted : {type: Boolean},
    createdAt : {type: Date, default : new Date().getTime()},
    updatedAt : {type: Date, default : new Date().getTime()},
});

module.exports = mongoose.model("users", usersSchema);
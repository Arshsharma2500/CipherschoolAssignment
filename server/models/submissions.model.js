const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionsSchema = new Schema({
    testId : {type: Object},
    userId : {type: Object},
    selections : {
        questionId : {type: Object},
        options : {type: String},
        savedAt : {type: Date, default : new Date().getTime()}
    },
    endedAt : {type: Date, default : new Date().getTime()},
    isDeleted : {type: Boolean},
    createdAt : {type: Date, default : new Date().getTime()}
});

module.exports = mongoose.model("submissions", submissionsSchema);
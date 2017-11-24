var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var QuestionSchema = new mongoose.Schema({
    question: {type: String, required: [true, "Your question can not be empty"]},
    details: {type: String},
    questioner: {type: String},
    // answers: {type: Number},
    _answer: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
},
{timestamps:true});

mongoose.model('Question', QuestionSchema);
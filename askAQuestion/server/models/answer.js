var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var AnswerSchema = new mongoose.Schema({
    answer: {type: String, required: [true, "Your answer can not be empty"]},
    details: {type: String},
    answerer: {type: String},
    likes: {type: Number}, 
    _question: {type: Schema.Types.ObjectId, ref: 'Question'}
},
{timestamps:true});

mongoose.model('Answer', AnswerSchema);
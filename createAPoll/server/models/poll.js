var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var PollSchema = new mongoose.Schema({
    question: {type: String, required: [true, "Name can not be empty"]},
    option_one: {type: String, required: [true, "Option can not be empty"]},
    option_two: {type: String, required: [true, "Option can not be empty"]},
    option_three: {type: String, required: [true, "Option can not be empty"]},
    option_four: {type: String, required: [true, "Option can not be empty"]},
    creator_first: {type: String},
    creator_last: {type: String},
    creator_email: {type: String},
    votes_one: {type: Number},
    votes_two: {type: Number},
    votes_three: {type: Number},
    votes_four: {type: Number},
    _registration: {type: Schema.Types.ObjectId, ref: 'registration'}
},
{timestamps:true});

mongoose.model('Poll', PollSchema);
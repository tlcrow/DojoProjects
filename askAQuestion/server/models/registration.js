var uniqueVal = require('mongoose-unique-validator')
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var RegistrationSchema = new mongoose.Schema({
    first_name: {type: String, required: [true, "Name can not be empty"],},
    // last_name: {type: String, required: [true, "Last name can not be empty"],},
    // email: {type: String, unique:true, required: [true, "Email can not be empty"], validate:{
    //     validator: function(value){
    //         return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    //     },
    //     message: "Invalid email"
    // }
    // },
    // password: {type: String, required: [true, "Password can not be empty"],},
    // password_confirmation:{type: String, required: [true, "Password confirmation must not be empty"], validate:{
    //     validator:function(value){
    //         return value == this.password;
    //     },
    //     message: "Password and password confirmation must match"
    //     }
    // },
    // birthday: {type: Date, required: [true, "Birthday can not be empty"],}
    },
    {timestamps:true});
// RegistrationSchema.plugin(uniqueVal);
// RegistrationSchema.methods.hash = function(password){
//     return bcrypt.hashSync(password,bcrypt.genSaltSync(8));
// }
    
// RegistrationSchema.methods.match = function(formPass,password){
//     return bcrypt.compareSync(formPass,password);
// }

// RegistrationSchema.pre("save", function(done){
//     console.log('pre');
//     this.password = this.hash(this.password);
//     this.password_confirmation = undefined;
//     done();

var Registration = mongoose.model('registration', RegistrationSchema);
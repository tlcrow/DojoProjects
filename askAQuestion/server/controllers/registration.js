var mongoose = require('mongoose');
var Registration = mongoose.model('registration');


module.exports = {
    getAll: function(req, res) {
        Registration.find({}, function(err, results){
            if(err) { console.log(err); }
            res.render('all', { registration: results });
        });
    },
    getUser:function(req, res){
        let {_id} = req.session
        Registration.findById({_id}, (err, auth)=>{
            if(err){
                return res.status(500).json("cant find user")
            }
            res.json(auth)
        })
    },

    create: function(req, res){
            // if(register.length > 0){
            //     res.json(;
            // }
            // else{
                console.log(req.body);
                let registration = new Registration(req.body);
                console.log(registration);
                registration.save((errs)=>{
                    if(errs){
                        console.log(registration.errors)
                        res.status(500).json(registration.errors)
                        // res.status(500).json(errs)
                    }
                    else{
                        req.session._id = registration._id;
                        req.session.first_name = registration.first_name;
                        // req.session.first_name = registration.first_name;
                        res.json(true);
                    }
                });
            // }
    },
    
    login: function(req, res){
        // let errs = [];
        Registration.findOne({email:req.body.email}, function(err, registration){
            // if(registration.length > 0){
            //     registration = registration[0];
            if(err || !registration){
                console.log("Could not find", err)
                return res.status(500).json("Could not find match")
            }
            if(!registration.match(req.body.password, registration.password)){
                // res.render("registration", {logErrs:["Invalid email or password"]});
                res.status(500).json("Invalid email or password");
            }
            else{
                req.session._id = registration._id
                // let currentUser = {};
                // currentUser._id = registration._id;
                // currentUser.first_name = registration.first_name;
                res.json(true);
            }
            // }
            // else{
            //     res.render("registration", {logErrs: ["User not found. Please register"]});
            // }
        });
    },
    logout: function(req, res){
        console.log("GOT TO CONTROLLER:",req.session._id)
        
        if(req.session._id){
            req.session._id = undefined;
            console.log("Controller clearing session:",req.session._id)
            // return;
            res.json(true)
        }
        res.json(false)
    }
        
};
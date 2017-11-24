var mongoose = require('mongoose');
var Poll = mongoose.model('Poll');
var Registration = mongoose.model('registration');
//require mongoose, import models

module.exports = {
    getAll: function(req, res) {
        Poll.find({}, function(err, results){
            if(err) { console.log(err); }
            res.json(results);
        });
    },

    //get all bikes

    getPoll:function(req, res){
        console.log("this is the poll get poll", req.params)
        Poll.findById({_id: req.params.id}, (err, poll)=>{
            if(err){
                return res.status(500).json("cant find polls-controller")
            }
            console.log("this is data", poll)
            res.json(poll)
        })
    },

    //get all bikes for the sessioned user

    create: function(req, res){
        console.log('create controller', req.body)
                let { _id } = req.session;
                Registration.findOne({_id:req.session._id}, (err, registration)=>{
                    if(err){
                        console.log(poll.err)
                        return res.status(502).json(poll.err)
                    }
                    let poll = new Poll(req.body);
                    poll.question =req.body.question;
                    poll.option_one =req.body.option_one;
                    poll.option_two =req.body.option_two;
                    poll.option_three =req.body.option_three;
                    poll.votes_one = 0;
                    poll.votes_two = 0;
                    poll.votes_three = 0;
                    poll.votes_four = 0;
                    poll.option_four =req.body.option_four;
                    poll.creator_first =req.session.first_name;
                    poll.creator_last =req.session.last_name;
                    poll.creator_email = req.session.email
                    poll._registration = registration;
                    poll.save((err)=>{
                        if(err){
                            console.log(err)
                            res.status(500).json(poll.errors)
                        }
                            res.json(true);
                    });
                })
                
    },

    //create a bike with sessioned user
    //this is why import registration

    delete: function(req, res){
        Poll.findOneAndRemove({ _id: req.params.id }, (err, result) => {
            console.log("this is controller", req.params.id)
            if(err) return res.status(406).json("Poll not deleted")
            console.log('Deleted')
            res.json(true)
        })
    },

    //delete bike

    updateOne: function(req, res){
        console.log("polls-controllers update one")
        Poll.findOne({_id:req.params.id}, (err, poll) =>{
            
            if(err){
                return res.status(502).json(err)
            }
            poll.votes_one += 1
            poll.save((err) =>{
                if (err) return res.status(409).json("Poll has not been updated")
                console.log("Vote1 updated")
                res.json(poll)
            })
        })
    },
    updateThree: function(req, res){
        console.log("polls-controllers update three")
        Poll.findOne({_id:req.params.id}, (err, poll) =>{
            
            if(err){
                return res.status(502).json(err)
            }
            poll.votes_three += 1
            poll.save((err) =>{
                if (err) return res.status(409).json("Poll has not been updated")
                res.json(poll)
            })
        })
    },
    updateTwo: function(req, res){
        console.log("polls-controllers update two")
        Poll.findOne({_id:req.params.id}, (err, poll) =>{
            
            if(err){
                return res.status(502).json(err)
            }
            poll.votes_two += 1
            poll.save((err) =>{
                if (err) return res.status(409).json("Poll has not been updated")
                res.json(poll)
            })
        })
    },
    updateFour: function(req, res){
        console.log("polls-controllers update four")
        Poll.findOne({_id:req.params.id}, (err, poll) =>{
            
            if(err){
                return res.status(502).json(err)
            }
            poll.votes_four += 1
            poll.save((err) =>{
                if (err) return res.status(409).json("Poll has not been updated")
                res.json(poll)
            })
        })
    }
    
}
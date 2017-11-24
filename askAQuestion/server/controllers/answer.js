var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
//require mongoose, import models

module.exports = {
    getAll: function(req, res) {
        Answer.find({}, function(err, results){
            if(err) { console.log(err); }
            res.json(results);
        });
    },

    getOne:function(req, res){
        Answer.findOne({ _id: req.params.id }, (err, result) => {
                    if(err) return res.status(406).json("Answer not found")
                    console.log('Found')
                    res.json(true)
                })
    },

    //get all bikes

    // getBike:function(req, res){
    //     let {_id} = req.session
    //     Bike.find({registration: req.session._id}, (err, bikes)=>{
    //         if(err){
    //                     return res.status(500).json("cant find bike")
    //                 }
    //                 res.json(bikes)
    //     })
    // },

    //get all bikes for the sessioned user

    create: function(req, res){
        console.log('create controller', req.body)
                Question.findOne({_id:req.params.id}, (err, question)=>{
                    if(err){
                        console.log(err)
                        return res.status(502).json(err)
                    }
                    console.log(question)
                    let answer = new Answer();
                    answer.answer = req.body.answer;
                    answer.details = req.body.details;
                    answer.answerer = req.session.first_name
                    answer.likes = 0;
                    answer._question = question._id;
                    
                    answer.save((err)=>{
                        question._answer.push(answer);
                        question.save ((err)=>{
                            if (err) return res.status(409).json("Question has not been updated")
                            res.json(true)
                        })
                    });
                    
                })
                
    },

    update: function(req, res){
        console.log("log 1")
        Answer.findOne({_id:req.params.id}, (err, answer) =>{
            
            if(err){
                return res.status(502).json(err)
            }
            answer.likes += 1
            answer.save((err) =>{
                if (err) return res.status(409).json("Answer has not been updated")
                res.json(true)
            })
        })
    }

    //create a bike with sessioned user
    //this is why import registration

    // delete: function(req, res){
    //     Bike.findOneAndRemove({ _id: req.params.id }, (err, result) => {
    //         if(err) return res.status(406).json("Bike not deleted")
    //         console.log('Deleted')
    //         res.json(true)
    //     })
    // },

    // //delete bike

    // update: function(req, res){
    //     console.log('update controller', req.body)
    //     Bike.findOne({_id: req.params.id }, (err, bike) => {
    //         if(err){
    //             return res.status(500).json("cant find bike")
    //             res.json(bikes)
    //         }
    //         bike.title = req.body.title;
    //         bike.description = req.body.description;
    //         bike.price = req.body.price;
    //         bike.location = req.body.location;
    //         bike.save ((err)=>{
    //             if (err) return res.status(409).json("Bike has not been updated")
    //             res.json(bike)
    //         })
    //     })
    // },

    // //update bike, extra bike stuff is NECESSARY

    // search: function(req, res){
    //     Bike.find({title: req.params.search}, (err, bikes) => {
    //         if(err) return res.status(567).json("Bike not found")
    //         res.json(bikes);
    //     })

    // }

    //this is for search bar
}
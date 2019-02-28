'use strict'

var User = require('../models/user');
var Answer = require('../models/answer');
var Survey = require('../models/survey');
var bcrypt = require('bcrypt-nodejs');
var auth = require('../middlewares/authenticated');
var jwt = require('../services/jwt');


function saveUser(req, res){
    var user = new User();
    var params = req.body;
  
    if (params.password && params.name && params.surname && params.email){
      user.name = params.name;
      user.surname = params.surname;
      user.email = params.email;
      user.role = 'ROLE_USER';
  
      User.findOne({email: user.email.toLowerCase()}, (err, issetUser) => {
  
        if(err){
          res.status(500).send({message: 'Sudden error'});
        }else{
          if(!issetUser){
            //res.status(200).send({message: 'AQUI VA A IR EL CIFRADO Y COMPARACION DE CONTRASENA'})
            bcrypt.hash(params.password, null, null, function(err, hash){
              user.password = hash;
  
              user.save((err, userStored) => {
                if(err){
                  res.status(500).send({message: 'No way to save the user'});
                }else{
                  if(!userStored){
                    res.status(404).send({message: 'Unable to make a record to Users collection'});
                  }else{
                    res.status(200).send({user: userStored});
                  }
                }
              });
            });
          }else{
            res.status(200).send({message: 'There no way to make a record of this user'});
          }
        }
      });
  
    }else{
      res.status(200).send({message: 'Sign the fields correctly'});
    }
  
  }

function listUser(req,res){
    User.find({}, (err, user) => {
      if(err){
        console.log(err);
        res.status(500).send({message: 'Unable to make a list of the users'})
      }else{
        res.status(200).send({user});
      }
    });
}

function login(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err,user) =>{
        if(err){
            res.status(500).send({
                message: 'An error occurred while login in the application'
            });
        }else{
            if(user){
                bcrypt.compare(password, user.password, (err,check) =>{
                    if(check){  
                        if(params.gettoken){
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                          Answer.find({user: user._id}, (err, answer) => {
                            Survey.find({user: user._id}, (err, survey) => {
                                res.status(200).send({answer, survey});
                            });
                          });
                        }
                    }else{
                        res.status(404).send({
                            message: 'The user is unable to log-in correctly'
                        });
                    }
                });
            }
            else{
                res.status(404).send({
                    message: 'No user found'
                });
            }
        }
    });
}


function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    if(req.user.role == 'ROLE_USER'){
      User.findByIdAndUpdate(userId, update, {new: true}, (err, careerUpdate) => {
        if(err){
          res.status(500).send({
            message: 'There was an error while updating the teacher'
          });
        }else{
          if(!careerUpdate){
            res.status(404).send({
              message: 'Unable to update the record from the collection'
            });
          }else{
              res.status(200).send({
                user: careerUpdate
              });
            
          }
        }
      });
    }else{
      res.status(500).send({
        message: 'Theres no way for you to update one of the careers, permission is only given by administrator'
      });
    }
  }

  function dropUser(req, res){
    var userId = req.params.id;  

    if(req.user.role == 'ROLE_USER'){
      User.findOneAndDelete({ _id:userId }, (err, userDelete) => {
        if(err){
          res.status(500).send({
            message: 'There was an error, no way to drop the record'
          })
        }else{
          if(!userDelete){
            res.status(404).send({
              message: 'Unable to delete the record'
            });
          }else{
              res.status(200).send({
                message: 'Record successfully deleted', user: userDelete
              });
          }
        }
      });
    }else{
      res.status(500).send({message: 'No way to drop this record'});
    }
  }


module.exports = {
    saveUser,
    listUser,
    dropUser,
    updateUser,
    login
}
'use strict'

var Answer = require('../models/answer');
var si = 0;
var no = 0;
var quiza = 0;

function saveAnswer(req, res){
    var answer = new Answer();
    var params = req.body;
    var survey = req.params.id;

  
    if (params.response && survey){
        answer.response = params.response;
        answer.user = req.user.sub;
        answer.survey = req.params.id;
        if(params.response == 'Si'){
          si ++;
          answer.si = si;
        }else if(params.response == 'No'){
          no ++;
          answer.no = no;
        }else if(params.response == 'Quiza'){
          quiza ++;
          answer.quiza = quiza;
        }
  
        Answer.findOne({survey:req.params.id, user:req.user.sub}, (err, issetAnswer) => {
          if(err){
              res.status(500).send({message: 'Sudden error'});
          }else{
            if(!issetAnswer){
              if(params.response == 'Si' || params.response == 'No' || params.response == 'Quiza'){
                answer.save((err, surveyAnswer) => {
                  if(err){
                    res.status(500).send({message: 'No way to save the user'});
                  }else{
                  if(!surveyAnswer){
                    res.status(404).send({message: 'Unable to make a record to Users collection'});
                  }else{
                    res.status(200).send({surveyAnswer});
                  }
                }
              });
            }else{

              res.status(500).send({message: 'There are just three kinds of answers: Si, No, Quiza'});

            } 
          }else{
            res.status(200).send({message: 'A survey with that title has been saved before yours'});
          }
        }
      });
  
    }else{
      res.status(200).send({message: 'Sign the fields correctly'});
    }
  }

function listAnswer(req,res){
    Answer.find({}, (err, answer) => {
      if(err){
        console.log(err);
        res.status(500).send({message: 'Unable to make a list of the users'})
      }else{
        res.status(200).send({answer});
      }
    });
}



function updateAnswer(req, res){
    var answerId = req.params.id;
    var update = req.body;

    if(update.response == 'Si'){

    }

      Answer.findByIdAndUpdate(answerId, update, {new: true}, (err, answerUpdate) => {
        if(err){
          res.status(500).send({
            message: 'There was an error while updating the teacher'
          });
        }else{
          if(!answerUpdate){
            res.status(404).send({
              message: 'Unable to update the record from the collection'
            });
          }else{
              res.status(200).send({
                answer: answerUpdate
              });
          }
        }
      });
  }

  function dropAnswer(req, res){
    var answerId = req.params.id;  
      Survey.findOneAndDelete({ _id:answerId }, (err, answerDelete) => {
        if(err){
          res.status(500).send({
            message: 'There was an error, no way to drop the record'
          })
        }else{
          if(!answerDelete){
            res.status(404).send({
              message: 'Unable to delete the record'
            });
          }else{
              res.status(200).send({
                message: 'Record successfully deleted', answer: answerDelete
              });
          }
        }
      });
  }


module.exports = {
    saveAnswer,
    listAnswer,
    dropAnswer,
    updateAnswer
}
'use strict'

var Survey = require('../models/survey');

function saveSurvey(req, res){
    var survey = new Survey();
    var params = req.body;
  
    if (params.title && params.question){
        survey.title = params.title;
        survey.question = params.question;
        survey.user = req.user.sub;
  
        Survey.findOne({title: params.title}, (err, issetSurvey) => {
        if(err){
            res.status(500).send({message: 'Sudden error'});
        }else{
          if(!issetSurvey){
              survey.save((err, surveyStored) => {
                if(err){
                  res.status(500).send({message: 'No way to save the user'});
                }else{
                  if(!surveyStored){
                    res.status(404).send({message: 'Unable to make a record to Users collection'});
                  }else{
                    res.status(200).send({survey: surveyStored});
                  }
                }
              });

          }else{
            res.status(200).send({message: 'A survey with that title has been saved before yours'});
          }
        }
      });
  
    }else{
      res.status(200).send({message: 'Sign the fields correctly'});
    }
  
  }

function listSurvey(req,res){
    Survey.find({}, (err, survey) => {
      if(err){
        console.log(err);
        res.status(500).send({message: 'Unable to make a list of the users'})
      }else{
        res.status(200).send({survey});
      }
    });
}

function updateSurvey(req, res){
    var surveyId = req.params.id;
    var update = req.body;

      Survey.findByIdAndUpdate(surveyId, update, {new: true}, (err, careerUpdate) => {
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
                survey: careerUpdate
              });
            
          }
        }
      });
  }

  function dropSurvey(req, res){
    var surveyId = req.params.id;  
      Survey.findOneAndDelete({ _id:surveyId }, (err, surveyDelete) => {
        if(err){
          res.status(500).send({
            message: 'There was an error, no way to drop the record'
          })
        }else{
          if(!surveyDelete){
            res.status(404).send({
              message: 'Unable to delete the record'
            });
          }else{
              res.status(200).send({
                message: 'Record successfully deleted', survey: surveyDelete
              });
          }
        }
      });
  }


module.exports = {
    saveSurvey,
    listSurvey,
    dropSurvey,
    updateSurvey
}
var mongoose = require('mongoose')
var Question = mongoose.model('Question')
var User = mongoose.model('User')
var Comment = mongoose.model('Comment')

module.exports = (function(){
  return {
    createQuestion: function(req, res){
      User.findOne({id:req.user.id}, function(err,user) {
        var newQuestion = new Question({
          title: req.body.title,
          description: req.body.description,
          topic: req.body.topic,
          posted_at: new Date(),
          _user: user._id,
        })
        newQuestion.save(function(err, data) {
          if (err) {
            console.log(err)
          } else {
            user.questions.push(newQuestion._id)
            user.save()
            res.json(data)
          }
        })
      })
    },
    getQuestions: function(req,res){
      Question.find({})
      .populate('_user')
      .exec(function(err, questions) {
        res.json(questions)
      })
    },
    createComment: function(req, res) {
      User.findOne({id:req.user.id}, function(err,user) {
        Question.findOne({_id:req.body.question_id}, function(err,question) {
          var newComment = new Comment({
            comment: req.body.comment,
            _user: user._id,
            _question: question._id
          })
          newComment.save(function(err, data) {
            if (err) {
              console.log(err)
            } else {
              user.comments.push(newComment._id)
              question.comments.push(newComment._id)
              user.save()
              question.save()
              res.json(data)
            }
          })
        })
      })
    },
    createAnswerComment: function(req, res) {
      User.findOne({id:req.user.id}, function(err,user) {
        Answer.findOne({_id:req.body.answer_id}, function(err,answer){
          var newAnswerComment = new Comment({
            comment: req.body.comment,
            _user: user._id,
            _answer: answer._id,
          })
          newAnswerComment.save(function(err,data) {
            if(err) {
              console.log(err)
            } else {
              user.comments.push(newAnswerComment._id)
              answer.comments.push(newAnswerComment._id)
              user.save()
              answer.save()
              res.json(data)
            }
          })
        })
      })
    },
    createAnswer: function(req, res) {
      User.findOne({id:req.user.id}, function(err,user) {
        Question.findOne({_id:req.body.question_id}, function(err,question) {
          var newAnswer = new Answer({
            answer: req.body.answer,
            _user: user._id,
            _question: question._id,
          })
          newAnswer.save(function(err,data){
            if (err) {
              console.log(err)
            } else {
              user.answers.push(newAnswer._id)
              question.answers.push(newAnswer._id)
              user.save()
              question.save()
              res.json(data)
            }
          })
        })
      })
    }
  }
})()

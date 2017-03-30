var mongoose = require('mongoose')
var Question = mongoose.model('Question')
var User = mongoose.model('User')
var Comment = mongoose.model('Comment')
var Answer = mongoose.model('Answer')

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
      .populate('comments')
      .populate({
          path: 'comments',
          populate: { path: '_user'}
      })
      .populate('answers')
      .populate({
        path: 'answers',
        populate: { path: '_user'}
      })
      .populate({
        path: 'answers',
        populate: { path: 'comments'}
      })
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
              console.log(newAnswerComment)
              console.log(answer.comments)
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
    },
    qUpvote: function(req, res) {
      user_id = req.user.id
      Question.findOne({_id:req.body.question_id}, function(err, question) {
        if (question.upvotes.length == 0) {
          question.upvotes.push(user_id)
        }
        for(var i = 0; i < question.upvotes.length; i++) {
          if (question.upvotes[i] != user_id) {
            question.upvotes.push(user_id)
          }
        }
        question.save()
        res.json(question)
      })
    },
    qDownvote: function(req, res) {
      user_id = req.user.id
      Question.findOne({_id:req.body.question_id}, function(err,question) {
        if (question.downvotes.length == 0) {
          question.downvotes.push(user_id)
        }
        for(var i = 0; i < question.downvotes.length; i++) {
          if (questions.downvotes[i] != user_id) {
            question.downvotes.push(user_id)
          }
        }
        question.save()
        res.json(question)
      })
    },
    aUpvote: function(req, res) {
      user_id = req.user.id
      Answer.findOne({_id:req.body.answer_id}, function(err,answer) {
        if (answer.upvotes.length == 0) {
          answer.upvotes.push(user_id)
        }
        for(var i = 0; i < answer.upvotes.length; i++) {
          if (answer.upvotes[i] != user_id) {
            answer.upvotes.push(user_id)
          }
        }
        answer.save()
        res.json(answer)
      })
    },
    aDownvote: function(req, res) {
      user_id = req.user.id
      Answer.findOne({_id:req.body.answer_id}, function(err,answer) {
        if (answer.downvotes.length == 0) {
          answer.downvotes.push(user_id)
        }
        for(var i = 0; i < answer.downvotes.length; i++) {
          if (answer.downvotes[i] != user_id) {
            answer.downvotes.push(user_id)
          }
        }
        answer.save()
        res.json(answer)
      })
    }
  }
})()

var mongoose = require('mongoose')
var Question = mongoose.model('Question')
var User = mongoose.model('User')

module.exports = (function(){
  return {
    createQuestion: function(req, res){
      console.log("This the git id",req.user.id)
      User.findOne({id:req.user.id}, function(err,user) {
        console.log("user...",user)
        var newQuestion = new Question({
          title: req.body.title,
          desription: req.body.description,
          topic: req.body.topic,
          posted_at: new Date(),
          _user: user._id,
        })
        newQuestion.save(function(err, data) {
          if (err) {
            console.log(err)
          } else {
            console.log("user id",user._id)
            console.log("New question added.")
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
  }
})()

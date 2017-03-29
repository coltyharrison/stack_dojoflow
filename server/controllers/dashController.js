var mongoose = require('mongoose')
var Question = mongoose.model('Question')

module.exports = (function(){
  return {
    create: function(req, res){
      // var user_id = req.session.user._id
      var newQuestion = new Question({
        title : req.body.title,
        description : req.body.description,
        topic : req.body.topic,
        posted_at : new Date()
      })
      // newQuestion._user = user_id
      newQuestion.save(function(err,data){
        if(err){
          console.log(err)
        }
        // else{
        //   User.update({_id:user_id}, {$push: {'items':newQuestion}}, function(err){
        //
        //   })
          console.log(newQuestion,": New Question added")
          res.json(data)
      })
    },
    getquestions: function(req,res){
      Question.find({}, function(err, question){
        res.json(question)
      })
    },
  }
})()

app.factory('questionFactory', function($http,$location,$route){
    var factory = {};

    factory.getQuestions = function(callback){
      $http.get('/getquestions').then(function(output){
        questions = output.data;
        callback(questions);
      })
    }
    factory.createQuestion = function(question){
      $http.post('/createQuestion', question).then(function(output){
        if(output.data){
          $location.url('/dash');
        }
      })
    }
    factory.createComment = function(comment, question_id, cb) {
      comment.question_id = question_id
      $http.post('/createComment',comment)
      .then(function() {
         cb();
      });
    }
    factory.createAnswer = function(answer, question_id, cb) {
      answer.question_id = question_id
      $http.post('/createAnswer', answer)
      .then(function() {
          cb();
      })
    }
    factory.createAnswerComment = function(comment, answer_id, cb) {
      comment.answer_id = answer_id
      $http.post('/createAnswerComment', comment)
      .then(function() {
         cb();
      });
    }

    factory.qUpvote = function(question_id, cb){
      vote_obj = {
        question_id: question_id
      }
      $http.post('/qUpvote', vote_obj)
      .then(function() {
          cb();
      });
    }
    factory.qDownvote = function(question_id, cb){
      vote_obj = {
        question_id: question_id
      }
      $http.post('/qDownvote', vote_obj)
      .then(function() {
          cb();
      });
    }
    factory.aUpvote = function(answer_id, cb) {
      vote_obj = {
        answer_id: answer_id
      }
      $http.post('/aUpvote', vote_obj)
      .then(function() {
          cb();
      });
    }
    factory.aDownvote = function(answer_id, cb) {
      vote_obj = {
        answer_id: answer_id
      }
      $http.post('/aDownvote', vote_obj)
      .then(function() {
          cb();
      });
    }

    return factory;
})

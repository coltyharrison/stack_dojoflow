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
    factory.createComment = function(comment, question_id) {
      comment.question_id = question_id
      $http.post('/createComment',comment)
    }
    factory.createAnswer = function(answer, question_id) {
      answer.question_id = question_id
      $http.post('/createAnswer', answer)
    }
    factory.createAnswerComment = function(comment, answer_id) {
      comment.answer_id = answer_id
      $http.post('/createAnswerComment', comment)
    }


    factory.qUpvote = function(question_id){
      vote_obj = {
        question_id: question_id
      }
      $http.post('/qUpvote', vote_obj)
    }
    factory.qDownvote = function(question_id){
      vote_obj = {
        question_id: question_id
      }
      $http.post('/qDownvote', vote_obj)
    }
    factory.aUpvote = function(answer_id) {
      vote_obj = {
        answer_id: answer_id
      }
      $http.post('/aUpvote', vote_obj)
    }
    factory.aDownvote = function(answer_id) {
      vote_obj = {
        answer_id: answer_id
      }
      $http.post('/aDownvote', vote_obj)
    }

    return factory;
})

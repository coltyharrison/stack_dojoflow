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
    return factory;
})

app.controller('questionController', function($scope, $routeParams, questionFactory) {


  var index = function() {
    // if the user selects a question
    if($routeParams.id) {
      //
      qestionFactory.getQuestions(function(data) {
        $scope.qestions = data
        for (var key in $scope.qestions) {
          if ($scope.questions[key]['_id'] == $routeParams.id) {
            $scope.question = $scope.questions[key]
          }
        }
      })
    } else {
      questionFactory.getQuestions(function(data) {
        $scope.questions = data
      })
    }
  }
  index()

  $scope.createQuestion = function() {
    questionFactory.createQuestion($scope.newQuestion)
    $scope.newQuestion = ''
    index()
  }


  // needs the question id passed to this function
  $scope.createComment = function(question_id) {
    question.Factory.createComment($scope.newComment, question_id)
    $scope.newComment = ''
    index()
  }
})

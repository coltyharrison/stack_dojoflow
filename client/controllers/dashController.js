app.controller('dashController', function($scope, questionFactory, $routeParams){
    $scope.errors = []
    $scope.questions = []

    var index = function() {
    if($routeParams.id) {
      questionFactory.getQuestions(function(returnedData){
        $scope.questions = returnedData;
        for(question in $scope.questions) {
          if ($scope.questions[question]['_id'] == $routeParams.id) {
            $scope.question = $scope.questions[question]
          }
        }
      })
    }else {
      questionFactory.getQuestions(function(data){
        $scope.questions = data
      })
    }
  }
    index()

    $scope.create = function(){
      $scope.errors = []
      if (!$scope.question || !$scope.question.title){
        $scope.errors.push('Please put the title')
      } else if ($scope.question.title.length < 6){
        $scope.errors.push('Your title is too short!')
      } else if ($scope.question.description.length < 10){
        $scope.errors.push('Please tell me more than that!')
      } else {
        questionFactory.create($scope.question)
      }
    }
})

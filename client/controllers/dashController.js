app.controller('dashController', function($scope, questionFactory){

    var setDash = function() {
        questionFactory.getQuestions(function(output){
            $scope.questions = output;
        })
        // questionFactory.getTopics(function(output){
        //     $scope.tasks = output;
        // })
        // ninjaFactory.getNinjas(function(output){
        //     $scope.tasks = output;
        // })
    }

    setDash();

    $scope.add_question = function(){
        questionFactory.create($scope.question);
        $scope.question = {}
    }
})

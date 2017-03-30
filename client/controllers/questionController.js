app.controller('questionController', function($scope, $routeParams, questionFactory) {
    $scope.topic = '';
    $scope.sortTopic = 'title';
    $scope.newAnswerComment = {};
    var index = function() {
        // if the user selects a question
        if ($routeParams.id) {
            questionFactory.getQuestions(function(data) {
                $scope.questions = data
                for (var key in $scope.questions) {
                    if ($scope.questions[key]['_id'] == $routeParams.id) {
                        $scope.question = $scope.questions[key]
                    }
                }
            })
        } else {
            questionFactory.getQuestions(function(data) {
                $scope.questions = data;
                if ($routeParams.topic) {
                    $scope.topic = $routeParams.topic;
                    $scope.questionsByTopic = [];
                    for (var i = 0; i < $scope.questions.length; i++) {
                        if ($scope.questions[i].topic === $routeParams.topic) {
                            $scope.questionsByTopic.push($scope.questions[i]);
                        }
                    }
                }
            });
        }
    };
    index();

    $scope.createQuestion = function() {
        questionFactory.createQuestion($scope.newQuestion)
        $scope.newQuestion = ''
        index()
    }

    // needs the question id passed to this function
    $scope.createComment = function(question_id) {
        questionFactory.createComment($scope.newComment, question_id)
        $scope.newComment = ''
        index()
    }

    // needs the question id passed to this function
    $scope.createAnswer = function(question_id) {
        questionFactory.createAnswer($scope.newAnswer, question_id, function() {
            $scope.newAnswer = ''
            index();
        })
    }
    $scope.createAnswerComment = function(answer_id) {
        questionFactory.createAnswerComment($scope.newAnswerComment, answer_id, function() {
            $scope.newAnswerComment = {};
            index();
        });
    };
});

app.controller('questionController', function($scope, $routeParams, questionFactory, $sce) {
    $scope.topic = '';
    $scope.sortTopic = 'title';
    $scope.newAnswerComment = {};
    $scope.topicNames = {
        'python': 'Python',
        'htmlcss': 'HTML / CSS',
        'mean': 'MEAN',
        'ruby': 'Ruby',
        'ios': 'iOS',
        'csharp': 'C# / ASP.NET',
        'misc': 'Misc'
    }
    var index = function() {
        // if the user selects a question
        if ($routeParams.id) {
            questionFactory.getQuestions(function(data) {
                $scope.questions = data
                for (var key in $scope.questions) {
                    if ($scope.questions[key]['_id'] == $routeParams.id) {
                        $scope.question = $scope.questions[key]
                        $scope.trustedHtml = $sce.trustAsHtml($scope.question.description)
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
        questionFactory.createComment($scope.newComment, question_id, function() {
            $scope.newComment = '';
            index();
        })
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
    // question upvote
    $scope.qUpvote = function(question_id) {
        questionFactory.qUpvote(question_id)
        index()
    }
    // question downvote
    $scope.qDownvote = function(question_id) {
        questionFactory.qDownvote(question_id)
        index()
    }
    // answer upvote
    $scope.aUpvote = function(answer_id) {
        questionFactory.aUpvote(answer_id)
        index()
    }
    // answer downvote
    $scope.aDownvote = function(answer_id) {
        questionFactory.aDownvote(answer_id)
        index()
    }
});

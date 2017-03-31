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
    $scope.topics = [
        {
            topic:'python',
            name: 'Python',
            questions: 0,
        },
        {
            topic:'htmlcss',
            name: 'HTML / CSS',
            questions: 0,
        },
        {
            topic:'mean',
            name: 'MEAN',
            questions: 0,
        },
        {
            topic:'ruby',
            name: 'Ruby',
            questions: 0,
        },
        {
            topic:'ios',
            name: 'iOS',
            questions: 0,
        },
        {
            topic:'csharp',
            name: 'C# / ASP.NET',
            questions: 0,
        },
        {
            topic:'misc',
            name: 'Misc',
            questions: 0,
        }
    ];

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
                topicCount();
            });
        }
    };
    index();

    var topicCount = function () {
        for (var i = 0; i < $scope.questions.length; i++) {
            for (var j = 0; j < $scope.topics.length; j++) {
                if ($scope.topics[j].topic === $scope.questions[i].topic) {
                    $scope.topics[j].questions++
                }
            }
        }
    }

    $scope.createQuestion = function() {
        questionFactory.createQuestion($scope.newQuestion)
        $scope.newQuestion = {};
        index()
    }

    // needs the question id passed to this function
    $scope.createComment = function(question_id) {
        questionFactory.createComment($scope.newComment, question_id, function() {
            $scope.newComment = {};
            index();
        })
    }

    // needs the question id passed to this function
    $scope.createAnswer = function(question_id) {
        questionFactory.createAnswer($scope.newAnswer, question_id, function() {
            $scope.newAnswer = {};
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
        questionFactory.qUpvote(question_id, function() {
            index();
        });
    }
    // question downvote
    $scope.qDownvote = function(question_id) {
        questionFactory.qDownvote(question_id, function() {
            index();
        });
    }
    // answer upvote
    $scope.aUpvote = function(answer_id) {
        questionFactory.aUpvote(answer_id, function() {
            index();
        });
    }
    // answer downvote
    $scope.aDownvote = function(answer_id) {
        questionFactory.aDownvote(answer_id, function() {
            index();
        });
    }
});

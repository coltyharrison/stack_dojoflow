app.factory('questionFactory', function($http,$location,$route){
    var factory = {};
    factory.questions = [
        {name:'Taylor', question:'Dude wheres my car?', topic:'MEAN', _id:31},
        {name:'Jace', question:'Did you bring the ramen?', topic:'Python', _id:25},
        {name:'Ian', question:'Why dont people call me Owen?', topic:'Web Fun', _id:223},
    ];

    factory.getQuestions = function(callback){
      $http.get('/getquestions').then(function(output){
        questions = output.data;
        callback(questions);
      })
    }

    factory.create = function(question){
      $http.post('/create', question).then(function(output){
        if(output.data){
          $location.url('/dash');
        }
      })
    }

    return factory;
})

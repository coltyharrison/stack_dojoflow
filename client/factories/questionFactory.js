app.factory('questionFactory', function(){
    var factory = {};
    factory.questions = [
        {name:'Taylor', question:'Dude wheres my car?', topic:'MEAN', _id:31},
        {name:'Jace', question:'Did you bring the ramen?', topic:'Python', _id:25},
        {name:'Ian', question:'Why dont people call me Owen?', topic:'Web Fun', _id:223},
    ];


    factory.getQuestions = function(callback){
        questions = factory.questions;
        callback(questions);
    }

    factory.create = function(question){
        $http.post('/create', question);
    }

    return factory;
})

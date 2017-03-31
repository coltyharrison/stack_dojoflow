var mongoose = require('mongoose')
var Question = mongoose.model('Question')
var User = mongoose.model('User')
var Comment = mongoose.model('Comment')
var Answer = mongoose.model('Answer')

module.exports = (function() {
    return {
        createQuestion: function(req, res) {
            User.findOne({
                id: req.user.id
            }, function(err, user) {
                var newQuestion = new Question({
                    title: req.body.title,
                    description: req.body.description,
                    topic: req.body.topic,
                    posted_at: new Date(),
                    _user: user._id,
                })
                newQuestion.save(function(err, data) {
                    if (err) {
                        // console.log(err)
                    } else {
                        user.questions.push(newQuestion._id)
                        user.ninja_stars += 1;
                        user.save()
                        res.json(data)
                    }
                })
            })
        },
        getQuestions: function(req, res) {
            Question.find({})
                .populate('_user')
                .populate('comments')
                .populate('answers')
                .populate({
                    path: 'answers',
                    populate: {
                        path: '_user'
                    }
                })
                .populate({
                    path: 'answers',
                    populate: {
                        path: 'comments'
                    }
                })
                .exec(function(err, questions) {
                    console.log(questions)
                    res.json(questions)
                })
        },
        createComment: function(req, res) {
            User.findOne({
                id: req.user.id
            }, function(err, user) {
                Question.findOne({
                    _id: req.body.question_id
                }, function(err, question) {
                    var newComment = new Comment({
                        comment: req.body.comment,
                        _user: user,
                        _question: question._id
                    })
                    newComment.save(function(err, data) {
                        if (err) {
                            console.log(err)
                        } else {
                            user.comments.push(newComment._id)
                            question.comments.push(newComment._id)
                            user.save()
                            question.save()
                            res.json(data)
                        }
                    })
                })
            })
        },
        createAnswerComment: function(req, res) {
            User.findOne({
                id: req.user.id
            }, function(err, user) {
                Answer.findOne({
                    _id: req.body.answer_id
                }, function(err, answer) {
                    var newAnswerComment = new Comment({
                        comment: req.body.comment,
                        _user: user,
                        _answer: answer._id,
                    })
                    newAnswerComment.save(function(err, data) {
                        if (err) {
                            console.log(err)
                        } else {
                            user.comments.push(newAnswerComment._id)
                            answer.comments.push(newAnswerComment._id)
                            user.save()
                            answer.save()
                            res.json(data)
                        }
                    })
                })
            })
        },
        createAnswer: function(req, res) {
            User.findOne({
                id: req.user.id
            }, function(err, user) {
                Question.findOne({
                    _id: req.body.question_id
                }, function(err, question) {
                    var newAnswer = new Answer({
                        answer: req.body.answer,
                        topic: question.topic,
                        _user: user._id,
                        _question: question._id,
                    })
                    newAnswer.save(function(err, data) {
                        if (err) {
                            console.log(err)
                        } else {
                            user.ninja_stars += 1;
                            user.answers.push(newAnswer._id)
                            question.answers.push(newAnswer._id)
                            user.save()
                            question.save()
                            res.json(data)
                        }
                    })
                })
            })
        },
        qUpvote: function(req, res) {
            user_id = req.user.id
            Question.findOne({
                    _id: req.body.question_id
                })
                .populate('_user')
                .exec(function(err, question) {
                    if (question.upvotes.indexOf(user_id) < 0) {
                        question.upvotes.push(user_id)
                        User.findByIdAndUpdate(question._user._id, {
                            $inc: {
                                'ninja_stars': 1
                            }
                        }, function(err, data) {
                            question.save(function(err) {
                                if (!err) {
                                    res.json(true);
                                }
                            })
                        })
                    }
                })
        },
        qDownvote: function(req, res) {
            user_id = req.user.id
            Question.findOne({
                _id: req.body.question_id
            }, function(err, question) {
                if (question.downvotes.indexOf(user_id) < 0) {
                    question.downvotes.push(user_id)
                    question.save(function(err) {
                        res.json(true);
                    })
                }
            });
        },
        aUpvote: function(req, res) {
            user_id = req.user.id
            Answer.findOne({
                    _id: req.body.answer_id
                })
                .populate('_user')
                .exec(function(err, answer) {
                    if (answer.upvotes.indexOf(user_id) < 0) {
                        answer.upvotes.push(user_id)
                        User.findByIdAndUpdate(answer._user._id, {
                            $inc: {
                                'ninja_stars': 1
                            }
                        }, function(err, data) {
                            answer.save(function(err) {
                                if (!err) {
                                    res.json(true);
                                }
                            })
                        })
                    }
                })
        },
        aDownvote: function(req, res) {
            user_id = req.user.id
            Answer.findOne({
                _id: req.body.answer_id
            }, function(err, answer) {
                if (answer.downvotes.indexOf(user_id) < 0) {
                    answer.downvotes.push(user_id)
                    answer.save(function(err) {
                        res.json(true);
                    })
                }
            });
        }
    }
})()

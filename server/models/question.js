var mongoose = require('mongoose'),
    QuestionSchema = mongoose.Schema({
        title: String,
        question: String,
        topic: String,
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        answers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Answer'
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        upvotes: {type: Number, default: 0},
        downvotes: {type: Number, default: 0}
    });
mongoose.model('Question', QuestionSchema);

var mongoose = require('mongoose'),
    QuestionSchema = mongoose.Schema({
        title: String,
        description: String,
        topic: String,
        posted_at: Date,
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
        upvotes: [],
        downvotes: []
    });
mongoose.model('Question', QuestionSchema);

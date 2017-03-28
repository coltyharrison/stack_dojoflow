var mongoose = require('mongoose'),
    AnswerSchema = mongoose.Schema({
        answer: String,
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        _question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        upvotes: {type: Number, default: 0},
        downvotes: {type: Number, default: 0}
    });
mongoose.model('Answer', AnswerSchema);

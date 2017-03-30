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
        upvotes: [],
        downvotes: []
    }, {timestamps:true});
mongoose.model('Answer', AnswerSchema);

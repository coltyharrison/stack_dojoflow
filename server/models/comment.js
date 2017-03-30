var mongoose = require('mongoose'),
    UserSchema = require('./user.js'),
    CommentSchema = mongoose.Schema({
        comment: String,
        _user: UserSchema,
        _answer: {type: mongoose.Schema.Types.ObjectId, ref: 'Answer'},
        _question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
        upvotes: {type: Number, default: 0},
        downvotes: {type: Number, default: 0}
    }, {timestamps: true});
mongoose.model('Comment', CommentSchema);

const {model, Schema, Types} = require('mongoose');

const commentSchema = new Schema({
  content: {
    type: String,
    maxLength: [100, 'Comment cannot exceed 100 charakters!'],
  },
  _ownerId: {type: Types.ObjectId, ref: 'User', required: true},
  docId: {type: Schema.Types.ObjectId, ref: '_docModel', required: true},
  _docModel: {type: String, required: true, enum: ['Status']},
});

const Comment = new model("Comment", commentSchema);

module.exports = Comment

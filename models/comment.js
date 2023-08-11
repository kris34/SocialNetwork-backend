const {model, Schema, Types} = require('mongoose');

const commentSchema = new Schema({
  content: {
    type: String,
    maxLength: [100, 'Comment cannot exceed 100 charakters!'],
  },
  ownerId: {type: [Types.ObjectId], ref: 'User', required: true},
  postId: {type: Schema.Types.ObjectId, ref: 'docModel', required: true},
  docModel: {type: String, required: true, enum: ['Status']},
});

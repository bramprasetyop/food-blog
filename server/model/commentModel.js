const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId

let commentSchema = new Schema({
  body: {
    type: String
  },
  articleId: {
    type: ObjectId,
    ref: "Articles"
  },
  guestId: {
    type: ObjectId,
    ref: "Guests"
  }
}, {
  timestamps: true
});





const Comment = mongoose.model("Comments", commentSchema);

module.exports = Comment;
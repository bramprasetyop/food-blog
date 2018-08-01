const Comment = require("../model/commentModel");
var jwt = require("jsonwebtoken");




function newComment(req, res) {
  var decoded = jwt.verify(req.headers.users, process.env.SECRET_KEY)

  let addComment = {
    body: req.body.body,
    articleId: req.body.articleId,
    guestId: decoded.id
  }
  Comment.create(addComment)
    .then(Comment => {
      res.status(200).json({
        message: 'new Comment added',
        Comment
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'failed',
        err
      })
    })
}

function getComment(req, res) {
  Comment.find({})
    .then(Comment => {
      res.status(200).json({
        message: 'get Comment',
        Comment
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'failed',
        err
      })
    })
}

module.exports = {
  newComment,
  getComment

};
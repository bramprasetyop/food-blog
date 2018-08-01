var express = require('express');
var router = express.Router();


const {
  newComment,
  getComment
} = require("../controllers/commentController");

router.post('/comments', newComment)
  .get('/comments/all', getComment)

module.exports = router;
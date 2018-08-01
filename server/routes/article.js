var express = require('express');
var router = express.Router();
var images = require('../helpers/images')

const {
  newArticle,
  getArticle,
  deleteArticle,
  getOneArticle,
  editArticle
} = require("../controllers/articleController");


var {
  logincheck
} = require("../helpers/auth");

/* GET articlelisting. */
router.post('/',logincheck, images.multer.single("image"),

    images.sendUploadToGCS,  newArticle)
  .get('/articles', getArticle)
  .delete('/articles/:id', logincheck, deleteArticle)
  .get('/articles/:id', getOneArticle)
  .put('/articles/:id', logincheck, editArticle)

module.exports = router;
const Article = require("../model/articleModel");

function newArticle(req, res) {

  let addArticle = {
    title:req.body.title,
    article: req.body.article,
    image: req.file.cloudStoragePublicUrl
    
  }

  Article.create(addArticle)
    .then(Article => {
      res.status(200).json({
        message: 'new Article added',
        Article
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'failed',
        err
      })
    })
}

function getArticle(req, res) {
  Article.find()
    .then(Article => {
      res.status(200).json({
        message: 'get Article',
        Article
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'failed',
        err
      })
    })
}

function deleteArticle(req, res) {
  Article.findByIdAndRemove(req.params.id)
    .then(Article => {
      res.status(200).json({
        message: 'delete Article',
        Article
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'failed',
        err
      })
    })
}

function getOneArticle(req, res) {
  Article.findOne({_id:req.params.id})
    .then(Article => {
      res.status(200).json({
        message: 'get one Article',
        Article
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'failed',
        err
      })
    })
}

function editArticle(req, res) {
  console.log('---------------edit----------------------')
  console.log(req.body.article);
  
  let idArticle = req.params.id
  
  let addArticle = {
    article: req.body.article
  }
  
  Article.findByIdAndUpdate(idArticle,addArticle)
    .then(Article => {
      res.status(200).json({
        message: 'edit Article success',
        Article
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
  newArticle,
  getArticle,
  deleteArticle,
  getOneArticle
  ,editArticle
};
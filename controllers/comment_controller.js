var models = require('../models/models.js');

// POST /quizes/:quizId/comments
exports.create = function(req, res, next) {
  var comment = models.Comment.build(
      { texto: req.body.comment.texto,
        QuizId: req.params.quizId
      });

  comment
  .validate()
  .then(
    function(err){
      if (err) {
        res.send({ errors: err.errors });
      } else {
        comment
        .save()
        .then( function(){ res.send({ msg: "Gracias por comentar" })})
      }
    }
  ).catch(function(error){next(error)});
};

// Autoload :id de comentarios
exports.load = function(req, res, next, commentId) {
  models.Comment
    .find({
      where: { id: Number(commentId) }
    })
    .then(function(comment) {
      if (comment) {
        req.comment = comment;
        next();
      } else {
        next(new Error('No existe commentId=' + commentId))
      }
    })
    .catch(function(error) {
      next(error);
    });
};

// GET /quizes/:quizId/comments/:commentId/publish
exports.publish = function (req, res, next) {
  req.comment.publicado = true;

  req.comment
    .save({
      fields: ["publicado"]
    })
    .then(function() {
      res.redirect('/quizes/' + req.params.quizId);
    })
    .catch(function(error) {
      next(error);
    });
}

// GET /quizes/:quizId/comments/:commentId/unpublish
exports.unpublish = function (req, res, next) {
  req.comment.publicado = false;

  req.comment
    .save({
      fields: ["publicado"]
    })
    .then(function() {
      res.redirect('/quizes/' + req.params.quizId);
    })
    .catch(function(error) {
      next(error);
    });
}

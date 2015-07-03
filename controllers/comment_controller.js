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

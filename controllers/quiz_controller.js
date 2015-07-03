var models = require('../models/models.js');
var moment = require('moment');

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz, moment: moment, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Incorrecto';
  if (req.query.respuesta.toLowerCase() === req.quiz.respuesta.toLowerCase()) {
    resultado = 'Correcto';
  }
  res.render(
    'quizes/answer',
    { quiz: req.quiz, respuesta: resultado, errors: [] }
  );
};

// Autoload :id
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
            where: {
                id: Number(quizId)
            },
            include: [{
                model: models.Comment
            }]
        }).then(function(quiz) {
        if (quiz) {
          req.quiz = quiz;
          next();
        } else {
          next( new Error('No existe quizId=' + quizId) )
        }
    }
  ).catch( function(error){ next(error) });
};

// GET /quizes
exports.index = function(req, res, next) {
  if (req.query.search===undefined) {
    models.Quiz.findAll().then(
      function(quizes) {
        res.render('quizes/index', { quizes: quizes, errors: [] });
      }
    ).catch( function(error){ next(error) });
  } else {
      var filtro  = (req.query.search || '').replace(" ", "%");
      models.Quiz.findAll({where:["lower(pregunta) like ?", '%'+filtro+'%'],order:'pregunta ASC'}).then(
      function(quizes) {
        res.render('quizes/index', { quizes: quizes, errors: [] });
      }
    ).catch( function(error){ next(error) });
  }
};

// POST /quizes/create
exports.create = function(req, res, next) {
  var quiz = models.Quiz.build( req.body.quiz );
  quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
        quiz
        .save({fields: ["pregunta", "respuesta", "tema"]})
        .then( function(){ res.redirect('/quizes')})
      }
    }
  ).catch(function(error){ next(error) });
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta", tema: "otro"}
  );
  res.render('quizes/new', {quiz: quiz, errors: [] });
};

// GET /quizes/:id/edit
exports.edit = function(req, res) {
  var quiz = req.quiz;
  res.render('quizes/edit', {quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function(req, res, next) {
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema      = req.body.quiz.tema;

  req.quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
        req.quiz
        .save({fields: ["pregunta", "respuesta", "tema"]})
        .then( function(){ res.redirect('/quizes');});
      }
    }
  ).catch(function(error){ next(error) });
};

// DELETE /quizes/:id
exports.destroy = function(req, res, next) {
  req.quiz.destroy().then(
    function() {
      res.redirect('/quizes');
  }).catch(function(error){ next(error) });
};

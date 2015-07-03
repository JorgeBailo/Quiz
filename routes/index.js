var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller.js')

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { errors: [] });
});

// Autoload de comandos con: quizId
router.param('quizId', quizController.load);   // autoload: quizId

// Definición de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

// Definicion de rutas de comentarios
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

// GET Author
router.get('/author', function(req, res, next) {
  res.render('author', { errors: [] });
});

module.exports = router;

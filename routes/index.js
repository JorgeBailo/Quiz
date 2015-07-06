var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller.js');
var sessionController = require('../controllers/session_controller.js');
var statsController = require('../controllers/stats_controller.js');

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { errors: [] });
});

// Autoload de comandos
router.param('quizId', quizController.load);   // autoload: quizId
router.param('commentId', commentController.load); // autoload: commentId

// Definición de rutas de session
router.get('/login',  sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

// Definición de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',     sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',  sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',       sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',    sessionController.loginRequired, quizController.destroy);

// Definición de rutas de estadisticas
router.get('/quizes/stats', statsController.load);

// Definicion de rutas de comentarios
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/unpublish', sessionController.loginRequired, commentController.unpublish);

// GET Author
router.get('/author', function(req, res, next) {
  res.render('author', { errors: [] });
});

module.exports = router;

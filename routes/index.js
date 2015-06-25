var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller.js')

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', {});
});

// Autoload de comandos con: quizId
router.param('quizId', quizController.load);   // autoload: quizId

// Definición de rutas de /quizes
router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

// GET Author
router.get('/author', function(req, res, next) {
  res.render('author', {});
});

module.exports = router;

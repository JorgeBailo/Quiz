var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

/* GET Question. */
router.get('/quizes/question', quizController.question);

/* GET Answer. */
router.get('/quizes/answer', quizController.answer);

/* GET Author. */
router.get('/author', function(req, res, next) {
  res.render('author', {});
});

module.exports = router;

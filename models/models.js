var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
  { dialect: "sqlite", storage:  "quiz.sqlite" }
);

// Importar definicion de la tabla Quiz
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

// exportar tabla
exports.Quiz = Quiz;

// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.create(
        {pregunta: 'Capital de Italia', respuesta: 'Roma'}
      ).then(function(){console.log('Base de datos (tabla quiz) inicializada')});
    };
  });
});

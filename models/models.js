var path = require('path');

// Postgres DATABASE_URL = postgress://user:password@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user    = (url[2] || null);
var pwd     = (url[3] || null);
var protocol= (url[1] || null);
var dialect = (url[1] || null);
var port    = (url[5] || null);
var host    = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgress
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect: protocol,
    protocol: protocol,
    port: port,
    host: host,
    storage: storage,
    omitNull: true
    }
  );

// Importar definicion de la tabla Quiz
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

// Importar definicion de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

// Relaciones
Comment.belongsTo(Quiz); //asociación Preguntas -> Comentarios
Quiz.hasMany(Comment);

// exportar tablas
exports.Quiz = Quiz;
exports.Comment = Comment;

// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.bulkCreate([
				{pregunta: 'Capital de Italia',   respuesta: 'Roma',    tema:'geografia'},
				{pregunta: 'Capital de Portugal', respuesta: 'Lisboa',  tema:'geografia'},
				{pregunta: 'Capital de España',   respuesta: 'Madrid',  tema:'geografia'}
			])
      .then(function(){console.log('Base de datos (tabla quiz) inicializada')});
    };
  });
});

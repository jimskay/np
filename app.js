var express = require('express');

var app = express();

var bodyParser = require('body-parser');

//var db_string = 'mongodb://localhost:/screencast_restful';
var db_string = 'localhost:27017/screencast_restful';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'));

db.once('open', function() {

	var userSchema = mongoose.Schema({
		fullname: String,
		email: String,
		password: String,
		created_at: Date

	});

	User = mongoose.model('User', userSchema);


});

app.listen(5000);

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({

	extended: true

}));



app.get('/', function(req, res) {

	new User({
			fullname: 'Leandro Tolentino',
			email: 'leandro_rochatolentino@yahoo.com.br',
			password: 123456,
			created_at: new Date()
		}).save(function (error, user) {

			if (error) {

				res.json({error: 'Não foi possível salvar o usuario'});

			} else {

				res.json(user);

			}

		});

	res.end('Servidor ON');

});

app.get('/users', function(req, res) {
/*
	new User({
			fullname: 'Leandro Tolentino',
			email: 'leandro_rochatolentino@yahoo.com.br',
			password: 123456,
			created_at: new Date()
		}).save(function (error, user) {

			if (error) {

				res.json({error: 'Não foi possível salvar o usuario'});

			} else {

				res.json(user);

			}

		});
*/


	User.find({}, function(error, users) {

		if(error) {

			res.json({error: 'Não foi possível retornar os usuarios'});

		} else {

			res.json(users);

		}

	});

/*
	res.json([
			{name: 'Leandro'},
			{name: 'Luiza'},
			{name: 'Leonardo'}
		]);
*/	

});


app.get('/users/:id', function(req, res) {

	var id = req.param('id');

	User.findById(id, function(error, users){

		if (error) {

			res.json({error: 'Não foi possivel retornar usuarios'});

		} else {

			res.json(users);

		}

	});

	res.end('Teste acessada!');
	
});

app.post('/users/', function(req, res) {

	/*

		new User({
			fullname: 'Leandro Tolentino',
			email: 'leandro_rochatolentino@yahoo.com.br',
			password: 123456,
			created_at: new Date()
		}).save(function (error, user) {

			if (error) {

				res.json({error: 'Não foi possível salvar o usuario'});

			} else {

				res.json(user);

			}

		});

	*/


	res.end('Teste acessada!');
	
});

app.put('/users/', function(req, res) {

	res.end('Teste acessada!');
	
});

app.delete('/users/:id', function(req, res) {

	res.end('Teste acessada!');
	
});
var restify = require("restify");

var mysql = require("mysql");

var arrToddy = [];

var con = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'ec021'
}

function insertToddy(req, res, next){
	var toddy = {
		id: arrToddy.length,
		lote: req.body.lote,
		conteudo: req.body.conteudo,
		validade: req.body.validade
	}
	
	var connection = mysql.createConnection(con);
	connection.connect();

	var strQuery = "INSERT INTO toddy (lote, conteudo, validade)" +
					"VALUE ('" +
					toddy.lote + "', '" +
					toddy.conteudo + "', '" +
					toddy.validade + "');";
	console.log(strQuery);

	connection.query(strQuery, function(err, rows, fields){
		if (!err) {
			res.json(rows);
		} else {
			res.json(err);
		}
	});
	
	connection.end();
    next();
}


function updateToddy(req, res, next){

	console.log("Update Toddy.")
	
	var toddy = {
		id: req.body.id,
		lote: req.body.lote,
		conteudo: req.body.conteudo,
		validade: req.body.validade
	}

	var connection = mysql.createConnection(con);
	connection.connect();

	var strQuery = 	"UPDATE toddy SET" +
					" lote = '" 		+ toddy.lote +
					"', conteudo = '" 	+ toddy.conteudo +
					"', validade = '" 	+ toddy.validade +
					"' WHERE id = '" 	+ toddy.id + "';";
	
	console.log(strQuery);

	connection.query(strQuery, function(err, rows, fields){
		if (!err) {
			res.json(rows);
		} else {
			res.json(err);
		}
	});

	connection.end();
	
    next();
}


function getToddy(req, res, next) {

	console.log("Get Toddy.")

	var connection = mysql.createConnection(con);
	connection.connect();

	var strQuery = 	"SELECT * FROM toddy;";
	
	console.log(strQuery);

	connection.query(strQuery, function(err, rows, fields){
		if (!err) {
			res.json(rows);
		} else {
			res.json(err);
		}
	});

	connection.end();
	
    next();
}


function deleteToddy(req, res, next){
	console.log("Get Toddy.")

	var connection = mysql.createConnection(con);
	connection.connect();

	var strQuery = 	"DELETE FROM toddy WHERE id = '" + req.body.id + "';";
	
	console.log(strQuery);

	connection.query(strQuery, function(err, rows, fields){
		if (!err) {
			res.json(rows);
		} else {
			res.json(err);
		}
	});

	connection.end();
	
    next();
}


var server = restify.createServer({
    name: 'Toddynho'
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

server.post("/save", insertToddy);
server.get("/get", getToddy);
server.put("/update", updateToddy);
server.del("/delete", deleteToddy);

var port = process.env.PORT || 5000;

server.listen(port, function() {
    console.log("%s rodando", server.name);
});